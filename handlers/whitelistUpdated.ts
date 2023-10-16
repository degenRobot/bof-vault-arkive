import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { WhitelistUpdated } from "../entities/whitelistUpdated.ts";



export const onWhitelistUpdated: EventHandlerFor<typeof BOF_ROUTER, "WhitelistUpdated"> = async (
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
    const { user, whitelist  } = event.args;

    await WhitelistUpdated.create({
        user : user,
        whitelist : whitelist,
        txHash : event.txHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};