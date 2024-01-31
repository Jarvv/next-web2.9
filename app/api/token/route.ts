export const runtime = 'edge'; // 'nodejs' is the default
export const dynamic = 'force-dynamic'; // static by default, unless reading the request

import { getUser as getUserThirdweb } from "../auth/[...thirdweb]/route";
import { NextResponse } from 'next/server'
import { ActivityType, Chains, OpenFormatSDK, RewardType, toWei } from "@openformat/sdk";

const sdk = new OpenFormatSDK({
    network: Chains.polygonMumbai,
    starId: process.env.APPLICATION_ID as string,
    signer: process.env.THIRDWEB_AUTH_PRIVATE_KEY,
  });

export async function POST(request: Request) {
    const thirdwebUser = await getUserThirdweb();

    if (!thirdwebUser) {
        return NextResponse.json({
            message: "Not authorized.",
        });
    }

    try{

        const params = {
            receiver: thirdwebUser.address,
            tokens: [
              {
                id: 'complete_mission', // A given ID for an action a user completes in your application
                address: '0xd07ac8c8c92dd4a7fa47db89268bc2981049716d', // The smart contract address of your Reward Token
                amount: toWei('1'), // The amount of Reward Tokens the receiver address will receive
                type: RewardType.CONSTELLATION_TOKEN,
                activityType: ActivityType.MISSION
              },
            ],
        };

        const response = await sdk.Reward.trigger(params);
       
        return NextResponse.json(response);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error);
    }
}