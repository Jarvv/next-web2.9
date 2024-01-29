import { getUser } from "../app/api/auth/[...thirdweb]/route";
import prisma from "../lib/prisma";

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

        return user
    }

    return null
};

export { useServerUser };