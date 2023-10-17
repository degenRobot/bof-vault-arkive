import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import { EventHandlerFor } from "../deps.ts";

import { DepositImmersive } from "../entities/depositImmersive.ts"


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
  
    await DepositImmersive.create({
        amount : amount,
        wallet : contract.address,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};