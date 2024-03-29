import { Manifest } from 'https://deno.land/x/robo_arkiver@v0.4.22/mod.ts'
import { BOF_ROUTER } from './abis/BofRouterFactory.ts'
import { onAccountRegistryUpdated } from './handlers/accountRegistryUpdate.ts'
import { DepositImmersiveHandler } from "./handlers/depositImmersive.ts";
import { onWithdrawImmersve } from "./handlers/withdrawalImmersive.ts";
import { IMMERSIVE_PAYMENT } from "./abis/ImmersvePaymentProtocol.ts";
import { onWalletCreatedFor } from "./handlers/walletCreatedFor.ts";
import { onWalletCreated } from "./handlers/walletCreated.ts";
import { BOF_WALLET } from "./abis/BoFWallet.ts";
import { onDeposit } from "./handlers/deposit.ts";
import { onBoFWalletAccountRegistryUpdated } from "./handlers/bofWalletaccountRegistryUpdate.ts";
import { onOwnershipTransferred } from "./handlers/ownershipTransferred.ts";
import { onProcessedPartialPayment } from "./handlers/processedPartialPayment.ts";
import { AccountRegistryUpdate } from './entities/accountRegistry.ts'
import { BofBalance } from "./entities/bofBalance.ts";
import { BOFHistory } from "./entities/bofHistory.ts";
import { BofWallet } from "./entities/bofWallet.ts";
import { BofAccountRegistryUpdate } from "./entities/bofWalletAccountRegistry.ts";
import { Deposit } from "./entities/deposit.ts";
import { DepositImmersive } from "./entities/depositImmersive.ts";
import { GovUpdateBof } from "./entities/govUpdatedBofRouter.ts";
import { WalletCreated } from "./entities/walletCreated.ts";
import { WalletCreatedFor } from "./entities/walletCreatedFor.ts";
import { config } from "./config/config.ts";
import { onWithdraw } from "./handlers/withdrawal.ts";
import { Withdrawal } from "./entities/withdrawal.ts";
import { onGovernanceUpdatedBof } from "./handlers/govUpdateBofRouter.ts";
import { onWalletWhitelisterUpdated } from "./handlers/walletWhitelisterUpdated.ts";
import { onWhitelistUpdated } from "./handlers/whitelistUpdated.ts";
import { onNewLockImmersve } from "./handlers/newLockImmersve.ts";

const manifest = new Manifest('bof-arkiver')

manifest
  .addEntities([
    AccountRegistryUpdate, 
    BofBalance, 
    BOFHistory, 
    BofWallet, 
    BofAccountRegistryUpdate, 
    Deposit, 
    DepositImmersive,
    GovUpdateBof,
    WalletCreated,
    WalletCreatedFor,
    Withdrawal,

  ])
  .addChain('polygonMumbai', (chain) =>
    chain
      .setOptions(
        {
          blockRange : 1000n,
          rpcUrl : config.rpcUrl,
        }
      )
      /*
      .addBlockHandler({
        blockInterval: 1000,
        startBlockHeight: 12790000n,
        handler: snapshotVault,
      })
      */
      .addContract({
        abi : BOF_ROUTER,
        name : "bof_router",
        sources : {
          "0xd98E3AFf1bf37AF330fa180E75ca9801C87176A3" : 40066325n,
        },
        eventHandlers : {
          AccountRegistryUpdated : onAccountRegistryUpdated,
          GovernanceUpdated : onGovernanceUpdatedBof,
          WalletCreated : onWalletCreated,
          WalletCreatedFor : onWalletCreatedFor,
          WalletWhitelisterUpdated : onWalletWhitelisterUpdated,
          WhitelistUpdated : onWhitelistUpdated,
        }
      })
      .addContract({
        abi : IMMERSIVE_PAYMENT,
        name : "immersive_payment",
        sources : {
          "0x91a4ee183763d9fd67F878abCCfFb2D6E51433eA" : 40066325n, 
        },
        eventHandlers : {

          ProcessedPartialPayment : onProcessedPartialPayment,
        }        
      })
      .addContract({
        abi : BOF_WALLET,
        name : "BOF_Wallet",
        factorySources: {
          bof_router: {
            WalletCreated: 'wallet',
            WalletCreatedFor: 'wallet',
          },
        },
      eventHandlers : {
        BoFWalletAccountRegistryUpdated : onBoFWalletAccountRegistryUpdated,
        OwnershipTransferred : onOwnershipTransferred,
        Deposit : onDeposit,
        DepositImmersve : DepositImmersiveHandler,
        Withdraw : onWithdraw,
        WithdrawImmersve : onWithdrawImmersve,
        NewLockImmersve : onNewLockImmersve, 
        // Transfer : 

      }
      })

  )

export default manifest
  .build()
