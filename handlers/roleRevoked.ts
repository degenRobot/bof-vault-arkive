import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { RoleGranted } from "../entities/roleGranted.ts";



export const onRoleRevoked: EventHandlerFor<typeof IMMERSIVE_PAYMENT, "RoleRevoked"> = async (
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
    const { role, account, sender  } = event.args;

    await RoleGranted.findOneAndDelete({
      role : role,
      account : account,
    }
    )

};