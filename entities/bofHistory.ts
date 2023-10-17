import { createEntity } from "../deps.ts";
import { HydratedDocument, Types } from 'npm:mongoose'
import { IBofWallet } from "./bofWallet.ts";


export interface IBOFHistory {
    user : IBofWallet;
    vault : string;
    contractAddress : string;
    amount : number;
    from : string;
    to : string;
    token : string;
    balanceAfter : number;
    txHash: string;
    type: string;
    block: number;
    timestamp: number;
    transactionCount : number; 
  }


  export const BOFHistory = createEntity<IBOFHistory>("Deposit", {
    user : { type: Types.ObjectId, ref: 'Wallet' },
    vault : String,
    contractAddress : String,
    amount : { type: Number, index: true },
    from : String,
    to : String,
    token : String,
    balanceAfter : { type: Number, index: true },
    txHash: String,
    type: String,
    block: { type: Number, index: true },
    timestamp: { type: Number, index: true },
    transactionCount : { type: Number, index: true },

  });

  export type BOFHistoryType = HydratedDocument<IBOFHistory>