import { createEntity } from "../deps.ts";

export interface IAccountRegistryUpdate {
    accountRegistry: string;
    txHash: string;
    block: number;
    timestamp: number;
  }


export const AccountRegistryUpdate = createEntity<IAccountRegistryUpdate>("AccountRegistryUpdate", {
  accountRegistry: String,
  txHash: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});