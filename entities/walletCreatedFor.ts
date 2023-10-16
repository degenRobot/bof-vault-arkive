import { createEntity } from "../deps.ts";

export interface IWalletCreatedFor {
    wallet: string;
    owner: string;
    block: number;
    timestamp: number;
  }


export const WalletCreatedFor = createEntity<IWalletCreatedFor>("WalletCreated", {
  wallet: String,
  owner: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});