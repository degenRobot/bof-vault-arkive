import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";

import {WithdrawImmersive } from "../entities/withdrawalImmersive.ts"


export const WithdrawImmersiveHandler: EventHandlerFor<typeof IMMERSIVE_PAYMENT, "UserWithdraw"> = async (
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
    const { _to, _value } = event.args;

    await WithdrawImmersive.create({
        user : _to,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};