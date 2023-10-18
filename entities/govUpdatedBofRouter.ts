import { createEntity } from "../deps.ts";

export interface IGovUpdateBof {
    newGov: string;
    oldGov: string;
    txHash: string;
    block: number;
    timestamp: number;
  }


export const GovUpdateBof = createEntity<IGovUpdateBof>("GovUpdateBof", {
  newGov: String,
  oldGov: String,
  txHash: String,
  block: { type: Number, index: true },
  timestamp: { type: Number, index: true },
});