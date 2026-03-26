import mongoose from "mongoose";

const todo = new mongoose.Schema(
  {
    text: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
);

const Todo = mongoose.models.Todo || mongoose.model("Todo", todo);
export default Todo;
