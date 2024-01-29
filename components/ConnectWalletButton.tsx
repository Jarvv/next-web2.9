'use client';
import { ConnectWallet} from "@thirdweb-dev/react";

const ConnectWalletButton = () => {
  return (
    <ConnectWallet 
        modalSize="compact"
        btnTitle="Connect to Wallet"
    />
  )
}

export default ConnectWalletButton