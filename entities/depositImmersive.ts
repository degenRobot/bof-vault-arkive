import { createEntity } from "../deps.ts";

export interface IDepositImmersive {
  amount: number;
  user : string,
  txHash : string,
  block: number;
  timestamp: number;
}


export const DepositImmersive = createEntity<IDepositImmersive>("DepositImmersive", {
  amount: { type: Number, index: true },
  user : String,
  txHash : String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});