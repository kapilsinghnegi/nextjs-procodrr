import mongoose from "mongoose";

const DB_URI = process.env.DB_URI as string;

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) return;
    const db = await mongoose.connect(DB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed: ", error);
    process.exit(1);
  }
};
