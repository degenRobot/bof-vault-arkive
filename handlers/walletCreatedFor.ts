import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { WalletCreatedFor } from "../entities/walletCreatedFor.ts";



export const onWalletCreatedFor: EventHandlerFor<typeof BOF_ROUTER, "WalletCreatedFor"> = async (
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
    const { owner, wallet } = event.args;

    await WalletCreatedFor.create({
        owner : owner,
        wallet : wallet, 
        txHash : event.txHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};