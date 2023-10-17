import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import { EventHandlerFor } from "../deps.ts";
import { LockedFunds } from "../entities/lockedFunds.ts";
import { BOFHistory } from "../entities/bofHistory.ts";
import { getWallet } from "../util/getWallet.ts";
import { getBalance } from "../util/getBalance.ts";


export const onProcessedPartialPayment: EventHandlerFor<typeof IMMERSIVE_PAYMENT, "ProcessedPartialPayment"> = async (
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
    const { _amount, _from } = event.args;

    const token = "0x91a4ee183763d9fd67F878abCCfFb2D6E51433eA"

    const wallet = getWallet(event.address); 
    const balance = getBalance(event.address, token) 

    const currentBalance = 0 //balance.amount 
    const newBalance = _amount //currentBalance - amount;
  
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
      contractAddress : event.address,
      amount : _amount,
      from : wallet,
      to : event.address,
      token : token, 
      balanceAfter : newBalance,
      txHash : event.transactionHash,
      type : "SPEND_IMMERSVE",
      block: Number(block.number),
      timestamp: Number(block.timestamp),
    })    




};