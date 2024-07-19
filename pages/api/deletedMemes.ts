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
  const deletedMemesFilters = {
    // testInd: getTestIndicator(),
    deletedInd: true,
  };
  try {
    let result: any = {};
    result = await db
      .collection("memes")
      .find(deletedMemesFilters)
      .sort({ createdDate: 1 }) // 1 for ascending order
      .limit(50)
      .toArray();

    await client.close();

    res.setHeader("Content-Type", "application/json");
    return res.json(result);
  } catch (error) {
    await db.collection("logs").insertOne({ message: JSON.stringify(error) });

    return res.json({ message: "Error searching memes" });
  }
}
