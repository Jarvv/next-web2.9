'use client';

import React from "react";
import { ThirdwebProvider, embeddedWallet, smartWallet } from "@thirdweb-dev/react";

const ThirdProvider = ({children} : any) =>{
    return(
        <ThirdwebProvider
            activeChain={"mumbai"}
            clientId={'83843c8a43aea4c1fa6e4fe1537b1cad'}
            authConfig={{
                authUrl: "/api/auth",
                domain: process.env.NEXT_PUBLIC_THIRDWEB_AUTH_DOMAIN as string,
              }}
            supportedWallets={[
                smartWallet(embeddedWallet(), {
                  gasless: true,
                  factoryAddress: '0xc36bed5c0d472e97f70271d0583228c0f45985ad'
                })
            ]}
        >
            {children}
        </ThirdwebProvider>
    )
}

export default ThirdProvider