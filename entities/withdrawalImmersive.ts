import { createEntity } from "../deps.ts";

export interface IWithdrawImmersive {
    amount: number;
    wallet : string,
    txHash : string,
    block: number;
    timestamp: number;
  }


export const WithdrawImmersive = createEntity<IWithdrawImmersive>("WithdrawImmersive", {
  amount: { type: Number, index: true },
  wallet : String,
  txHash : String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});