// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../helpers/mongoDbClient";
import { getTestIndicator } from "../../utils";

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
    const recentMemes = await db
      .collection("memes")
      .find({
        deletedInd: false,
      })
      .sort({ createdDate: 1 }) // 1 for ascending order
      .limit(10)
      .toArray();

    const recentFeatures = Array.from(
      new Set(
        recentMemes.flatMap((recentMeme) => recentMeme.features || [])
      ).values()
    ); // Use flatMap on the array of documents

    await client.close();

    res.setHeader("Content-Type", "application/json");
    return res.json({ recentMemes, recentFeatures });
  } catch (error) {
    await db.collection("logs").insertOne({ message: JSON.stringify(error) });

    return res.json({ message: "Error searching memes" });
  }
}
