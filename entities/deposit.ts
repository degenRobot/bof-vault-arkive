import { createEntity } from "../deps.ts";

export interface IDeposit {
    vault: string;
    amount: number;
    sharesMinted : number;
    block: number;
    timestamp: number;
  }


export const Deposit = createEntity<IDeposit>("Deposit", {
  vault: String,
  amount: { type: Number, index: true },
  sharesMinted: { type: Number, index: true },
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});