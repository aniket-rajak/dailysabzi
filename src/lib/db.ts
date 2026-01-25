import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("DB Error");
}

let cached = global.mongoose;

// Global Declare (global.decodeURI.ts)
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// if cached present then return
const connectDb = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  // If Connection Null and Promise Null Then Connect Mongodb

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URL)
      .then((conn) => conn.connection);
  }

  // Connection Null But Wait for Promise
  try {
    const conn = await cached.promise;
    return conn;
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;

// Now We Use This connectDb Function on Every API (Benifits: Avoid Multiple Connection)
