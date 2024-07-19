import { NextApiRequest, NextApiResponse } from "next";
import CryptoJS from "crypto-js";
import { connectToDatabase } from "../../helpers/mongoDbClient";
import { getTestIndicator } from "../../utils";

export interface MemeBody {
  cloudinaryId: string;
  cloudinaryUrl: string;
  features: string[];
  name: string;
}

export default async function features(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { db, client } = await connectToDatabase(true);

  try {
    const encryptedKey = req.headers["x-api-key"];

    if (!encryptedKey) {
      const xForwardedFor = req.headers["x-forwarded-for"] as string;
      const ip = xForwardedFor
        ? xForwardedFor.split(",")[0]
        : req.connection.remoteAddress;
      throw new Error("Unauthorized user trying to create meme from ip: " + ip);
    }
    const bytes = CryptoJS.AES.decrypt(
      encryptedKey as string,
      process.env.ADD_SECRET_KEY!
    );
    const decryptedKey = bytes.toString(CryptoJS.enc.Utf8);

    const isValidKey = await db
      .collection("keys")
      .findOne({ value: decryptedKey });

    if (!isValidKey) {
      const xForwardedFor = req.headers["x-forwarded-for"] as string;
      const ip = xForwardedFor
        ? xForwardedFor.split(",")[0]
        : req.connection.remoteAddress;
      throw new Error("Unauthorized user trying to create meme from ip: " + ip);
    }

    const { cloudinaryId, cloudinaryUrl, features, name } = JSON.parse(
      req.body
    ) as MemeBody;

    if (!cloudinaryId || !cloudinaryUrl || !name) {
      throw new Error("Bad request one of the fields are null");
    }

    await db
      .collection("memes")
      .insertOne({
        cloudinaryId,
        cloudinaryUrl,
        features,
        name,
        createdDate: new Date(),
        testInd: getTestIndicator(),
        deletedInd: false,
      });

    await client.close();

    return res.json({ success: true, message: "Meme was added" });
  } catch (error) {
    await db.collection("logs").insertOne({ message: JSON.stringify(error) });
    return res.json({ success: false, message: "Error getting features." });
  }
}
