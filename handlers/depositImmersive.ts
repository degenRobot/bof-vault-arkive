import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import { EventHandlerFor } from "../deps.ts";
import { DepositImmersive } from "../entities/depositImmersive.ts"
import { BofBalance } from "../entities/bofBalance.ts";
import { BOFHistory } from "../entities/bofHistory.ts";
import { Deposit } from "../entities/deposit.ts";
import { getWallet } from "../util/getWallet.ts";
import { getBalance } from "../util/getBalance.ts";
import { getTransactionCount } from "../util/getTransactionCount.ts";
import { BofWallet } from "../entities/bofWallet.ts";


export const DepositImmersiveHandler: EventHandlerFor<typeof BOF_WALLET, "DepositImmersve"> = async (
    {
      event,
      client,
      store,
      contract,
      logger,
    },
  ) => {
    const block = await store.retrieve(
      `getBlock: ${event.blockNumber}`,
      async () => await client.getBlock({ blockNumber: event.blockNumber }),
    );
    const { amount } = event.args;
    console.log("New Deposit Immersive From - " + event.address)

    const wallet = await getWallet(event.address); 
    
    await DepositImmersive.create({
        amount : amount,
        wallet : contract.address,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });  

      const token = "0x2FaC06acFAeB42CC3B5327fcF53F48D9Da72749d"
      const balance = await getBalance(event.address, token) 
      const newBalance = BigInt(balance) + amount //currentBalance + amount;
    
      // TO DO SAVE BALANCE 
      await BofBalance.updateOne({
        owner: event.address,
        token: token, 
      }, {$set : {
        amount: Number(newBalance),
      }}, {
        upsert : true
      });
    
    
      // To DO FIND From BOF Hisotry 
      const currentCount = await getTransactionCount(event.address); 
    
      await BOFHistory.create({
        user : wallet,
        contractAddress : event.address,
        amount : Number(amount),
        from : wallet,
        to : event.address,
        token : token, 
        balanceAfter : Number(newBalance) ,
        txHash : event.transactionHash,
        type : "DEPOSIT_IMMERSVE",
        block: Number(block.number),
        timestamp: Number(block.timestamp),
        transactionCount : currentCount + 1,
      }) 
      
      await BofWallet.findOneAndUpdate({
        contractAddress : event.address
      }, 
      {
        transactionCount : currentCount + 1,
      })

};