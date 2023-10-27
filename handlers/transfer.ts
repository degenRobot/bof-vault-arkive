import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import { EventHandlerFor } from "../deps.ts";
import { BofBalance } from "../entities/bofBalance.ts";
import { BOFHistory } from "../entities/bofHistory.ts";
import { getWallet } from "../util/getWallet.ts";
import { getBalance } from "../util/getBalance.ts";
import { getTransactionCount } from "../util/getTransactionCount.ts";
import { Withdrawal } from "../entities/withdrawal.ts";
import { BofWallet } from "../entities/bofWallet.ts";


export const onTransfer: EventHandlerFor<typeof BOF_WALLET, "Transfer"> = async (
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
    const { amount, token, from, to } = event.args;
    console.log("New Withdrawal From - " + event.address)
    const wallet = await getWallet(event.address); 
    
    

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
    contractAddress : event.address,
    amount : Number(amount),
    from : from,
    to : to,
    token : token, 
    balanceAfter : Number(newBalance) ,
    txHash : event.transactionHash,
    type : "TRANSFER",
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