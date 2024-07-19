import { Filter, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../helpers/mongoDbClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id: featureId } = req.query;
  
  console.log("featureId:", featureId);
  const filters: Filter<Document> = {
    // testInd: getTestIndicator(), 
    deletedInd: false,
    features: { $in: [featureId] }
  };

  if (!featureId || Array.isArray(featureId)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const { db, client } = await connectToDatabase();

  try {
    const memesWithFeature = await db
                        .collection("memes")
                        .find(filters as any)
                        .toArray();
                        
    if (memesWithFeature.length === 0) {
      throw new Error("Feature not found");
    }

    const deleteFeaturePromises = memesWithFeature.map(m => 
                                    db.collection('memes').updateOne(
                                      { 
                                        _id: new ObjectId(m._id)
                                      }, 
                                      { 
                                        $set: {
                                           features: (m as any)['features'].filter((f: string) => f != featureId) 
                                        }
                                      }));

    var result = await Promise.all(deleteFeaturePromises);
    
    if (result.length === 0) {
      throw new Error("Feature could not be deleted!");
    }

    res.status(200).json({ message: "Feature deleted successfully" });
  } catch (error) {
    console.error("Error deleting meme:", error);
    await db.collection("logs").insertOne({ message: JSON.stringify(error) });
    res.status(500).json({ message: "Error deleting meme" });
  } finally {
    await client.close();
  }
}
