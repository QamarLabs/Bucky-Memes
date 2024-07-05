import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../helpers/mongoDbClient";
import { NextRequest, NextResponse } from "next/server";

export default async function activities(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    
try {
    const { db, client } = await connectToDatabase();
    const memesCursor = db.collection("memes").find({});
    const memes = await memesCursor.toArray(); // Convert the cursor to an array
    
    const features = new Set(memes.flatMap((meme) => meme.features || [])); // Use flatMap on the array of documents

    await client.close();
    res.send(Array.from(features.values()));
  } catch (error) {
    console.log("FUCK YOU ERROR:", error);
    res.send({ message: "Error getting features." });
  }
}
