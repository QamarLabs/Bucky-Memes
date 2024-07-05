// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ObjectId } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "../../helpers/mongoDbClient";

export type QueryParams = {
  id?: string | undefined
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
}

export default async function memes(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const { db, client } = await connectToDatabase();
    const { id } = req.query as QueryParams;

    let result: any = {};
    const filters: any = {};
    console.log("req.method:", req.method);
    if (req.method == "POST") {
      const { query, features } = JSON.parse(req.body) as SearchBody;
      const queryToUse = query ? query.trim() : "";
      if (queryToUse) {
        filters.$or = [{ name: { $regex: `.*${queryToUse}.*`, $options: "i" } }];
      }

      if (features && features.length > 0) {
        filters.features = { $in: features };
      }

      result = await db.collection("memes").find(filters).toArray();
    } else {
      if (id)
        result = await db
          .collection("memes")
          .findOne({ _id: new ObjectId(id) });
      else result = await db.collection("memes").find({}).toArray();
    }

    await client.close();1
    
    res.setHeader("Content-Type", "application/json");
    res.send(result);
  } catch (error) {
    res.send({ message: "Error searching memes" });
  }
}
