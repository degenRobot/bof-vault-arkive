import { createEntity } from "../deps.ts";

export interface IBofBalance {
  amount: number;
  owner : string;
  token : string;
}

export const BofBalance = createEntity<IBofBalance>("BofBalance", {
  amount: { type: Number, index: true },
  owner : String,
  token : String,
});