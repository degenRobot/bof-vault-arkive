import { createEntity } from "../deps.ts";

export interface IPaused {
    account : string,
    paused : boolean,
    txHash : string,
    block: number;
    timestamp: number;
  }


export const Paused = createEntity<IPaused>("WithdrawImmersive", {
  account : String,
  paused : Boolean,
  txHash : String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});