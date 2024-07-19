// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Filter, ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../helpers/mongoDbClient";
import { getTestIndicator } from "../../utils";

export type QueryParams = {
  id?: string | undefined;
};

export type SearchBody = {
  query: string;
  features: string[];
};

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
    const { id } = req.query as QueryParams;

    let result: any = {};
    const filters: Filter<Document> = {
      // testInd: getTestIndicator(), 
      deletedInd: false,
    };
    
    if (req.method == "POST") {
      const { query, features } = JSON.parse(req.body) as SearchBody;
      const queryToUse = query ? query.trim() : "";
      if (queryToUse) {
        filters.$or = [
          { name: { $regex: `.*${queryToUse}.*`, $options: "i" } },
        ];
      }

      if (features && features.length > 0) {
        filters.features = { $in: features };
      }

      result = await db
        .collection("memes")
        .find(filters as any)
        .toArray();
    } else {
      if (id)
        result = await db
          .collection("memes")
          .findOne({ _id: new ObjectId(id) });
      else
        result = await db
          .collection("memes")
          .find(filters as any)
          .toArray();
    }

    await client.close();

    res.setHeader("Content-Type", "application/json");
    return res.json(result);
  } catch (error) {
    await db.collection("logs").insertOne({ message: JSON.stringify(error) });

    return res.json({ message: "Error searching memes" });
  }
}
