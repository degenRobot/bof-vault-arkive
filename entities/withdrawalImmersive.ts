import { createEntity } from "../deps.ts";

export interface IWithdrawImmersive {
    amount: number;
    user : string,
    txHash : string,
    block: number;
    timestamp: number;
  }


export const WithdrawImmersive = createEntity<IWithdrawImmersive>("WithdrawImmersive", {
  amount: { type: Number, index: true },
  user : String,
  txHash : String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});