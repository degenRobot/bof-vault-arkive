import { createEntity } from "../deps.ts";

export interface ILockedFunds {
    amount: number;
    user : string,
    id : string,
    txHash : string,
    block: number;
    timestamp: number;
  }


export const LockedFunds = createEntity<ILockedFunds>("LockedFunds", {
  amount: { type: Number, index: true },
  user : String,
  id : String,
  txHash : String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});