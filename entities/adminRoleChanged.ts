import { createEntity } from "../deps.ts";

export interface IAdminRoleChanged {
    newAdminRole: string;
    oldAdminRole: string;
    role: string;
    txHash: string;
    block: number;
    timestamp: number;
  }


export const AdminRoleChanged = createEntity<IAdminRoleChanged>("AdminRoleChanged", {
  newAdminRole: String,
  oldAdminRole : String,
  role : String,
  txHash: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});