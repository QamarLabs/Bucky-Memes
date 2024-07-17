// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import CryptoJS from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../helpers/mongoDbClient";

export const config = {
  api: {
    bodyParser: true,
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5,
};

export default async function memes(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { db, client } = await connectToDatabase();
  try {
    const encryptedKey = req.headers["X-Api-Key"];

    if (!encryptedKey) {
      const xForwardedFor = req.headers["x-forwarded-for"] as string;
      const ip = xForwardedFor
        ? xForwardedFor.split(",")[0]
        : req.connection.remoteAddress;
      throw new Error("Unauthorized user trying to create meme from ip: " + ip + " This reason no encrypted key!");
    }

    const bytes = CryptoJS.AES.decrypt(
      encryptedKey as string,
      process.env.ADD_SECRET_KEY!
    );
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("decryptedKey:", decryptedKey);
    const isValidKey = await db
      .collection("keys")
      .findOne({ value: decryptedKey });
    // console.log('isValidKey:', isValidKey);
    if (!isValidKey) {
      const xForwardedFor = req.headers["x-forwarded-for"] as string;
      const ip = xForwardedFor
        ? xForwardedFor.split(",")[0]
        : req.connection.remoteAddress;
      throw new Error("Unauthorized user trying to create meme from ip: " + ip + " This reason no invalid encrypted key!");
    }
    return res.json({ validated: true });
  } catch (error: any) {
    await db.collection("logs").insertOne({ message: JSON.stringify(error.message) });
    return res.json({ validated: false, message: `Error getting keys: ${error}` });
  }
}
