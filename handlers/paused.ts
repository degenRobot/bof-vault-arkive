import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { Paused } from "../entities/Paused.ts";



export const onPaused: EventHandlerFor<typeof IMMERSIVE_PAYMENT, "Paused"> = async (
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
    const { account } = event.args;

    await Paused.create({
        account : account,
        paused : true,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};