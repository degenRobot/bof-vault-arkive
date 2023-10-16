import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { WalletWhitelisterUpdated } from "../entities/walletWhitelisterUpdated.ts";



export const onWalletWhitelisterUpdated: EventHandlerFor<typeof BOF_ROUTER, "WalletWhitelisterUpdated"> = async (
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
    const { walletWhitelister  } = event.args;

    await WalletWhitelisterUpdated.create({
        walletWhitelister : walletWhitelister,
        txHash : event.txHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};