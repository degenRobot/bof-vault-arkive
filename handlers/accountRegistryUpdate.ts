import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";

import {AccountRegistryUpdate} from "../entities/accountRegistry.ts"


export const onAccountRegistryUpdated: EventHandlerFor<typeof BOF_ROUTER, "AccountRegistryUpdated"> = async (
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
    const { accountRegistry } = event.args;

    await AccountRegistryUpdate.create({
        accountRegistry: accountRegistry,
        txHash : event.txHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};