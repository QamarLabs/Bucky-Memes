import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/mongoDbClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;
  console.log("ID:", id);

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const { db, client } = await connectToDatabase();

  try {
    const result = await db
      .collection("memes")
      .updateOne({ _id: new ObjectId(id) }, { $set: { deletedInd: true } });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Meme not found" });
    }

    res.status(200).json({ message: "Meme deleted successfully" });
  } catch (error) {
    console.error("Error deleting meme:", error);
    await db.collection("logs").insertOne({ message: JSON.stringify(error) });
    res.status(500).json({ message: "Error deleting meme" });
  } finally {
    await client.close();
  }
}
