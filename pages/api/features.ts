import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../helpers/mongoDbClient";

export default async function features(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    
const { db, client } = await connectToDatabase();
try {
    const memesCursor = db.collection("memes").find({});
    const memes = await memesCursor.toArray(); // Convert the cursor to an array
    
    const features = new Set(memes.flatMap((meme) => meme.features || [])); // Use flatMap on the array of documents

    return res.json(Array.from(features.values()));
  } catch (error) {
    await db.collection('logs').insertOne({ message: JSON.stringify(error) });
    return res.json({ message: "Error getting features." });
  }
}
