import { Address } from '../deps.ts'
import { BofBalance } from "../entities/bofBalance.ts";

export const getBalance = async (address: Address, token: Address) =>{
    const record = await BofBalance.findOne({ address, token })
    if (record) {
      return record.amount
    }

    return BigInt(0)    

}