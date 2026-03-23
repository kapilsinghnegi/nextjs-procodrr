import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

// await mongoose.connect(DB_URI);
// console.log("Database connected");

// mongoose.model("Todo", {});

// const db = mongoose.connection.db;

// export default db;

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed: ", error);
    process.exit(1);
  }
};
