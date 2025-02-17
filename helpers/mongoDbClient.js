import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */

export async function connectToDatabase(isPost = false) {
  const opts = {
  };
  const uri = isPost ? process.env.ADD_MONGODB_URI : process.env.MONGODB_URI
  return await MongoClient.connect(process.env.MONGODB_URI, opts).then((client) => {
    return {
      client,
      db: client.db(MONGODB_DB),
    };
  });
}
