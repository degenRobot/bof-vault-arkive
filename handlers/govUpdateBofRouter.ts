import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";

import { GovUpdateBof } from "../entities/govUpdatedBofRouter.ts"


export const onGovernanceUpdatedBof: EventHandlerFor<typeof BOF_ROUTER, "GovernanceUpdated"> = async (
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
    const { newGov, oldGov } = event.args;

    await GovUpdateBof.create({
        newGov: newGov,
        oldGov : oldGov,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};