import { Address } from '../deps.ts'
import { BOFHistory } from '../entities/bofHistory.ts'


export const getTransactionCount = async (address: Address) =>{
    const count = await BOFHistory.count({ contractAddress : address })
    if (count) {
      return count
    }
    return 0

}