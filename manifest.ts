import { Manifest } from 'https://deno.land/x/robo_arkiver@v0.4.22/mod.ts'
import { VaultSnapshot } from './entities/vault.ts'
import { snapshotVault } from './handlers/vault.ts'
import { BOF_ROUTER } from './abis/BofRouterFactory.ts'
import { onAccountRegistryUpdated } from './handlers/accountRegistryUpdate.ts'
import { DepositImmersiveHandler } from "./handlers/depositImmersive.ts";
import { WithdrawImmersiveHandler } from "./handlers/withdrawalImmersive.ts";
import { IMMERSIVE_PAYMENT } from "./abis/ImmersvePaymentProtocol.ts";
import { onGovernanceUpdatedBof } from './handlers/govUpdateBofRouter.ts'
import { onWalletCreatedFor } from "./handlers/walletCreatedFor.ts";
import { onWalletCreated } from "./handlers/walletCreated.ts";
import { onWalletWhitelisterUpdated } from "./handlers/walletWhitelisterUpdated.ts";
import { onWhitelistUpdated } from "./handlers/whiteListUpdated.ts";
import { onLockedFunds } from "./handlers/lockedFunds.ts";
import { onLockedFundsPartialPaymentConfirmation } from "./handlers/lockedFundsPartialPaymentConfirmation.ts";
import { onLockedFundsPaymentConfirmation } from "./handlers/LockedFundsPaymentConfirmation.ts";
import { onRoleAdminChanged } from "./handlers/roleAdminChanged.ts";
import { onRoleGranted } from "./handlers/roleGranted.ts";
import { onRoleRevoked } from "./handlers/roleRevoked.ts";
import { onPaused } from "./handlers/paused.ts";
import { onUnpaused } from "./handlers/unpaused.ts";
import { BOF_WALLET } from "./abis/BoFWallet.ts";
import { onDeposit } from "./handlers/deposit.ts";
import { onBoFWalletAccountRegistryUpdated } from "./handlers/bofWalletaccountRegistryUpdate.ts";
import { onOwnershipTransferred } from "./handlers/ownershipTransferred.ts";
import { onProcessedPartialPayment } from "./handlers/processedPartialPayment.ts";

const manifest = new Manifest('bof-arkiver')

manifest
  .addEntity(VaultSnapshot)
  .addChain('polygonMumbai', (chain) =>
    chain
      .setOptions(
        {
          blockRange : 100n,
          rpcUrl : 'https://rpc-mumbai.maticvigil.com'
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
          "0x3c4d6c6ae4d219665E9E277Ba37B67A79881A865" : 33744993n
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
          "0xd73c2deE4604a1af3Db4E8E07Cf6Fb798aB77982" : 31371857n 
        },
        eventHandlers : {
          //UserDeposit : DepositImmersiveHandler,
          //UserWithdraw : WithdrawImmersiveHandler,
          //LockedFunds : onLockedFunds, 
          //LockedFundsPartialPaymentConfirmation : onLockedFundsPartialPaymentConfirmation, 
          //LockedFundsPaymentConfirmation : onLockedFundsPaymentConfirmation, 
          RoleAdminChanged : onRoleAdminChanged,
          RoleGranted : onRoleGranted,
          RoleRevoked : onRoleRevoked,
          Paused : onPaused,
          Unpaused : onUnpaused, 
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

      }
      })

  )

export default manifest
  .build()
