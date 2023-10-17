import { createEntity } from "../deps.ts";

export interface IOwnershipTransferred {
    newOwner: string;
    oldOwner: string;
    txHash: string;
    block: number;
    timestamp: number;
  }


export const OwnershipTransferred = createEntity<IOwnershipTransferred>("OwnershipTransferred", {
  newOwner: String,
  oldOwner : String,
  txHash: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});