import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../helpers/mongoDbClient";

export default async function features(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    
try {
    const { db, client } = await connectToDatabase();
    const memesCursor = db.collection("memes").find({});
    const memes = await memesCursor.toArray(); // Convert the cursor to an array
    
    const features = new Set(memes.flatMap((meme) => meme.features || [])); // Use flatMap on the array of documents

    await client.close();
    return res.json(Array.from(features.values()));
  } catch (error) {
    return res.json({ message: "Error getting features." });
  }
}
