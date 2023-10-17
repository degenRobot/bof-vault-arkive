import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";

import { BofAccountRegistryUpdate } from "../entities/bofWalletAccountRegistry.ts";


export const onBoFWalletAccountRegistryUpdated: EventHandlerFor<typeof BOF_WALLET, "BoFWalletAccountRegistryUpdated"> = async (
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
    const { newAccountRegistry, oldAccountRegistry } = event.args;

    await BofAccountRegistryUpdate.create({
        newAccountRegistry: newAccountRegistry,
        oldAccountRegistry:oldAccountRegistry,
        txHash : event.txHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};