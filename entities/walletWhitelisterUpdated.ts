import { createEntity } from "../deps.ts";

export interface IWalletWhitelisterUpdated {
    walletWhitelister : string;
    txHash: string;
    block: number;
    timestamp: number;
  }


  export const WalletWhitelisterUpdated = createEntity<IWalletWhitelisterUpdated>("WalletWhitelisterUpdated", {
    walletWhitelister: String,
    txHash: String,
    block: { type: Number, index: true },
    timestamp: { type: Number, index: true },
  });