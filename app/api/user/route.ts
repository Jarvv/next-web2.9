import { getUser as getUserThirdweb } from "../auth/[...thirdweb]/route";
import prisma from "../../../lib/prisma";
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
        const res = await request.json()

        const params = {
            receiver: thirdwebUser.address, // The address of the user who is receiving the XP tokens
            tokens: [
              {
                id: 'sign_up', // A given ID for an action a user completes in your application
                address: process.env.XP_TOKEN_ID, // The smart contract address of your XP TOKEN
                amount: toWei('1'), // The amount of XP tokens the receiver address will receive
                type: RewardType.XP_TOKEN,
                activityType: ActivityType.ACTION
              },
            ],
          };

        const [userRes, tokenRes] = await Promise.all([
            prisma?.users.create({
                data: {
                    name: res.name,
                    image: res.image,
                    address: thirdwebUser.address,
                },
            }),
            sdk.Reward.trigger(params)
        ])

        return NextResponse.json(userRes);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error);
    }
  }

  export async function GET(request: Request) {
    const thirdwebUser = await getUserThirdweb();

    if (!thirdwebUser) {
        return NextResponse.json({
            message: "Not authorized.",
        });
    }

    try {
        const user = await prisma?.users.findUnique({
            where: {
                address: thirdwebUser.address
            }
        })

        return NextResponse.json(user);
    } catch (error) {
        console.log(error)
        return NextResponse.json(error);
    }
  }