import { createEntity } from "../deps.ts";

export interface IWalletCreated {
    wallet: string;
    owner: string;
    block: number;
    timestamp: number;
  }


export const WalletCreated = createEntity<IWalletCreated>("WalletCreated", {
  wallet: String,
  owner: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});