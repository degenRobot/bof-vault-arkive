import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { BofBalance } from "../entities/bofBalance.ts";
import { BOFHistory } from "../entities/bofHistory.ts";
import { BofWallet } from "../entities/bofWallet.ts";

import {WithdrawImmersive } from "../entities/withdrawalImmersive.ts"
import { getBalance } from "../util/getBalance.ts";
import { getTransactionCount } from "../util/getTransactionCount.ts";
import { getWallet } from "../util/getWallet.ts";


export const onWithdrawImmersve: EventHandlerFor<typeof BOF_WALLET, "WithdrawImmersve"> = async (
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
    const wallet = await getWallet(event.address); 


    await WithdrawImmersive.create({
        wallet : contract.address,
        amount : amount,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    

      const token = "0x2FaC06acFAeB42CC3B5327fcF53F48D9Da72749d"
      const balance = await getBalance(event.address, token) 
      const newBalance = BigInt(balance) - amount //currentBalance + amount;
    
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
        from : event.address,
        to : wallet,
        token : token, 
        balanceAfter : Number(newBalance) ,
        txHash : event.transactionHash,
        type : "WITHDRAW_IMMERSVE",
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