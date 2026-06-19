import mongoose from "mongoose";

let connectionPromise: Promise<typeof mongoose> | null = null;
let hasLoggedConnection = false;

export async function connectDB() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (mongoose.connection.readyState === 1) {
    return;
  }

  connectionPromise ??= mongoose.connect(mongoUri).catch((error) => {
    connectionPromise = null;
    throw error;
  });

  await connectionPromise;

  if (!hasLoggedConnection) {
    console.log("MongoDB connected");
    hasLoggedConnection = true;
  }
}
