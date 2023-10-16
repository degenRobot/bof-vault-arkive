import { createEntity } from "../deps.ts";

export interface IRoleGranted {
    role: string;
    account: string;
    sender: string;
    txHash: string;
    block: number;
    timestamp: number;
  }


export const RoleGranted = createEntity<IRoleGranted>("AccountRegistryUpdate", {
  role: String,
  account : String,
  sender : String,
  txHash: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});