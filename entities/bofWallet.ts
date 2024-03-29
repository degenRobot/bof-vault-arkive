import { createEntity } from "../deps.ts";

export interface IBofWallet {
    owner: string;
    contractAddress : string;
    block: number;
    timestamp: number;
    txHash : string;
    transactionCount : number;
  }


export const BofWallet = createEntity<IBofWallet>("BofWallet", {
  owner: String,
  contractAddress: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
  txHash: String,
  transactionCount : Number,

});