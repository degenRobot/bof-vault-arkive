import { createEntity } from "../deps.ts";

export interface IWithdrawal {
    vault: string;
    amount: number;
    sharesWithdrawn : number;
    block: number;
    timestamp: number;
  }


  export const Withdrawal = createEntity<IWithdrawal>("Withdrawal", {
    vault: String,
    amount: { type: Number, index: true },
    sharesWithdrawn: { type: Number, index: true },
    block: { type: Number, index: true },
    timestamp: { type: Number, index: true },
  });