import {BOF_ROUTER} from "../abis/BofRouterFactory.ts"
import {BOF_WALLET} from "../abis/BoFWallet.ts"
import {IMMERSIVE_PAYMENT} from "../abis/ImmersvePaymentProtocol.ts"
import { EventHandlerFor } from "../deps.ts";
import { BofWallet } from "../entities/bofWallet.ts";
import { WalletCreated } from "../entities/walletCreated.ts";



export const onWalletCreated: EventHandlerFor<typeof BOF_ROUTER, "WalletCreated"> = async (
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

    await WalletCreated.create({
        owner : owner,
        wallet : wallet, 
        txHash : event.txHash,
        block: Number(block.number),
        timestamp: Number(block.timestamp),
      });    


    await BofWallet.create({
      owner : owner, 
      contractAddress : wallet,
      txHash : event.txHash,
      block: Number(block.number),
      timestamp: Number(block.timestamp),      
    })   
};