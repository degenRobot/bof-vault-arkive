import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { OwnershipTransferred } from "../entities/ownershipTransferred.ts";



export const onOwnershipTransferred: EventHandlerFor<typeof BOF_WALLET, "OwnershipTransferred"> = async (
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
    const { newOwner, oldOwner } = event.args;

    await OwnershipTransferred.create({
        newOwner: newOwner,
        oldOwner: oldOwner,
        txHash : event.txHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};