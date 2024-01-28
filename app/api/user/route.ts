// import { getUser as getUserThirdweb } from "../auth/[...thirdweb]/route";
// import { NextApiRequest, NextApiResponse } from "next";


// const POST = async (req: NextApiRequest, res: NextApiResponse) => {
//     // Get the user off the request
//     const thirdwebUser = await getUserThirdweb(req);

//     // Check if the user is authenticated
//     if (!thirdwebUser) {
//         return res.status(401).json({
//             message: "Not authorized.",
//         });
//     }

//     try {
//         const user = await prisma?.users.findUnique({
//             where: {
//                 email: thirdwebUser.address
//             }
//         })
//         return res.status(200).json(user);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// }

// export default POST

import { getUser as getUserThirdweb } from "../auth/[...thirdweb]/route";
import type { NextApiRequest, NextApiResponse } from "next";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("hello")
  // Get the user off the request
  const user = await getUserThirdweb();

  // Check if the user is authenticated
  if (!user) {
    return res.status(401).json({
      message: "Not authorized.",
    });
  }

  // Return a protected resource to the authenticated user
  return res.status(200).json({
    message: `This is a secret for ${user.address}.`,
  });
};

export {getUser as GET}