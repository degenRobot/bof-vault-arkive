import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { AdminRoleChanged } from "../entities/adminRoleChanged.ts";
import { RoleGranted } from "../entities/roleGranted.ts";



export const onRoleAdminChanged: EventHandlerFor<typeof IMMERSIVE_PAYMENT, "RoleAdminChanged"> = async (
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
    const { newAdminRole, previousAdminRole, role } = event.args;

    // TO DO ALSO UPDATE ROLE GRANTED ENTRY

    await AdminRoleChanged.create({
        newAdminRole : newAdminRole,
        previousAdminRole : previousAdminRole, 
        role : role, 
        txHash : event.transactionHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    
};