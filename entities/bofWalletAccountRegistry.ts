import { createEntity } from "../deps.ts";

export interface IBofAccountRegistryUpdate {
    newAccountRegistry: string;
    oldAccountRegistry: string;
    txHash: string;
    block: number;
    timestamp: number;
  }


export const BofAccountRegistryUpdate = createEntity<IBofAccountRegistryUpdate>("AccountRegistryUpdate", {
  newAccountRegistry: String,
  oldAccountRegistry: String,
  txHash: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});