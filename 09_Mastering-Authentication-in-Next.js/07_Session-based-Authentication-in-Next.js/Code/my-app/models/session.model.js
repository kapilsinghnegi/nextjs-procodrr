import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now, expires: 24 * 7 * 60 * 60 },
});

const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
export default Session;
