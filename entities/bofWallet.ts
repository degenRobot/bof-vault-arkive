import { createEntity } from "../deps.ts";

export interface IBofWallet {
    owner: string;
    contractAddress : string;
    block: number;
    timestamp: number;
    txHash : string;
  }


export const BofWallet = createEntity<IBofWallet>("WalletCreated", {
  owner: String,
  contractAddress: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
  txHash: String,

});