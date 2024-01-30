import { getUserProfile } from "@/queries/open-format";
import { getUser } from "../app/api/auth/[...thirdweb]/route";
import prisma from "../lib/prisma";
import { GetUserProfileResponse } from "@/@types";
import { ActivityType, Chains, OpenFormatSDK, RewardType, fromWei, toWei } from "@openformat/sdk";

const sdk = new OpenFormatSDK({
    network: Chains.polygonMumbai,
    starId: process.env.APPLICATION_ID as string,
    signer: process.env.THIRDWEB_AUTH_PRIVATE_KEY,
  });

const useServerUser = async () => {
    const thirdwebUser = await getUser();

    if(thirdwebUser != null){
        const user = await prisma?.users.findUnique({
            where: {
                address: thirdwebUser.address
            }
        })

        if (!user?.address) {
            return null
        }

        const response =
        await sdk.subgraph.rawRequest<GetUserProfileResponse>(
          getUserProfile,
          {
            user: thirdwebUser.address.toLowerCase(),
            app: sdk.appId.toLowerCase(),
            xp: (process.env.XP_TOKEN_ID as string).toLowerCase(),
            rewardToken: (
              process.env.REWARD_TOKEN_ID as string
            ).toLowerCase(),
          }
        );

        const XPBalance = response.user?.tokenBalances.find(
            (token) =>
                token.token.id === process.env.XP_TOKEN_ID?.toLowerCase()
        );

        const RewardTokenBalance = response.user?.tokenBalances.find(
            (token) =>
                token.token.id === process.env.REWARD_TOKEN_ID?.toLowerCase()
        );

        return(
        {    
            name: user.name,
            image: user.image,
            address: user.address,

            xp_balance: fromWei(Number(XPBalance?.balance ?? 0).toFixed(0)),
            reward_token_balance: fromWei(Number(RewardTokenBalance?.balance ?? 0).toFixed(0)),
            completed_missions: response.missions,
            completed_actions: response.actions,
          
        })
    }

    return null
};

export { useServerUser };