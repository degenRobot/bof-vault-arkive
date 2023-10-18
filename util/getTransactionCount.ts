import { Address } from '../deps.ts'
import { BOFHistory } from '../entities/bofHistory.ts'


export const getTransactionCount = async (address: Address) =>{
    const record = await BOFHistory.findOne({ contractAddress : address })
    if (record) {
      return record.transactionCount
    }
    return 0

}