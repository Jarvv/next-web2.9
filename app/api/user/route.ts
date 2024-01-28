import { getUser as getUserThirdweb } from "../auth/[...thirdweb]/route";
import prisma from "../../../lib/prisma";

export async function POST(request: Request) {
    const thirdwebUser = await getUserThirdweb();

    if (!thirdwebUser) {
        return Response.json({
            message: "Not authorized.",
        });
    }

    try{
        const res = await request.json()

        const user = await prisma?.users.create({
            data: {
                name: res.name,
                image: res.image,
                address: thirdwebUser.address,
            },
        });

        return Response.json(user);
    } catch (error) {
        console.log(error)
        return Response.json(error);
    }
  }

  export async function GET(request: Request) {
    const thirdwebUser = await getUserThirdweb();

    if (!thirdwebUser) {
        return Response.json({
            message: "Not authorized.",
        });
    }

    try {
        const user = await prisma?.users.findUnique({
            where: {
                address: thirdwebUser.address
            }
        })

        return Response.json(user);
    } catch (error) {
        console.log(error)
        return Response.json(error);
    }
  }