import { createEntity } from "../deps.ts";

export interface IWhitelistUpdated {
    user : string;
    whitelist : string,
    txHash: string;
    block: number;
    timestamp: number;
  }


  export const WhitelistUpdated = createEntity<IWhitelistUpdated>("WhitelistUpdated", {
    user: String,
    whitelist: String,
    txHash: String,
    block: { type: Number, index: true },
    timestamp: { type: Number, index: true },
  });