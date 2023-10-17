import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import { EventHandlerFor } from "../deps.ts";
import { BofBalance } from "../entities/bofBalance.ts";
import { BOFHistory } from "../entities/bofHistory.ts";
import { Deposit } from "../entities/deposit.ts";
import { getWallet } from "../util/getWallet.ts";
import { getBalance } from "../util/getBalance.ts";


export const onDeposit: EventHandlerFor<typeof BOF_WALLET, "Deposit"> = async (
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
    
    const wallet = getWallet(event.address); 
    
    await Deposit.create({
        vault : vault,
        token : token,
        amount : amount,
        wallet : event.address,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    

  // TO DO FIX THIS LOGIC 
  const balance = getBalance(event.address, token) 
  const currentBalance = 0 //balance.amount 
  const newBalance = amount //currentBalance + amount;

  // TO DO SAVE BALANCE 
  await BofBalance.create({
    amount: newBalance,
    owner: event.address,
    token: token, 
  });

  // To DO FIND From BOF Hisotry 
  const currentCount = 0; 

  await BOFHistory.create({
    user : wallet,
    vault : vault,
    contractAddress : event.address,
    amount : amount,
    from : wallet,
    to : vault,
    token : token, 
    balanceAfter : newBalance,
    txHash : event.transactionHash,
    type : "Deposit",
    block: Number(block.number),
    timestamp: Number(block.timestamp),
  })

};