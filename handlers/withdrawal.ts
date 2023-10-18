import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import { EventHandlerFor } from "../deps.ts";
import { BofBalance } from "../entities/bofBalance.ts";
import { BOFHistory } from "../entities/bofHistory.ts";
import { getWallet } from "../util/getWallet.ts";
import { getBalance } from "../util/getBalance.ts";
import { getTransactionCount } from "../util/getTransactionCount.ts";
import { Withdrawal } from "../entities/withdrawal.ts";


export const onWithdraw: EventHandlerFor<typeof BOF_WALLET, "Withdraw"> = async (
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
    const { amount, token, vault } = event.args;
    console.log("New Withdrawal From - " + event.address)
    const wallet = await getWallet(event.address); 
    
    await Withdrawal.create({
        vault : vault,
        token : token,
        amount : Number(amount),
        wallet : event.address,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    

  // TO DO FIX THIS LOGIC 
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
    vault : vault,
    contractAddress : event.address,
    amount : Number(amount),
    from : wallet,
    to : vault,
    token : token, 
    balanceAfter : Number(newBalance) ,
    txHash : event.transactionHash,
    type : "Withdrawal",
    block: Number(block.number),
    timestamp: Number(block.timestamp),
  })

};