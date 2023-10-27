import { Address } from '../deps.ts'
import { WalletCreated } from "../entities/walletCreated.ts";

export const getWallet = async (address: Address) =>{
    const record = await WalletCreated.findOne({ contractAddress : address })
    if (record) {
      return record
    }
    return null

}