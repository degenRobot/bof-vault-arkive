import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { LockedFunds } from "../entities/lockedFunds.ts";



export const onLockedFundsPartialPaymentConfirmation: EventHandlerFor<typeof IMMERSIVE_PAYMENT, "LockedFundsPartialPaymentConfirmation"> = async (
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
    const { _from, _value, _lockedFundsId } = event.args;

    await LockedFunds.create({
        user : _from,
        amount : _value, 
        id : _lockedFundsId,
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};