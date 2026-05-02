import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    console.log("Using existing connection");
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log("New connection established!");
      return mongoose;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", err);
    throw err;
  }
  return cached.conn;
}

export default connectDB;
