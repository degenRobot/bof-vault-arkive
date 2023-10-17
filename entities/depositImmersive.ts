import { createEntity } from "../deps.ts";

export interface IDepositImmersive {
  amount: number;
  wallet : string,
  txHash : string,
  block: number;
  timestamp: number;
}


export const DepositImmersive = createEntity<IDepositImmersive>("DepositImmersive", {
  amount: { type: Number, index: true },
  wallet : String,
  txHash : String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});