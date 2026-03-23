# Creating Mongoose model in Next.js

```js
// @/models/todo.model.js
import mongoose from "mongoose";

const todo = new mongoose.Schema(
  {
    text: { type: String, required: true, unique: true },
    completed: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
);

const Todo = mongoose.model("Todo", todo);
export default Todo;
```

It gives us error when we use it in our route handler as it tries to create/overwrite the `Todo` model. To avoid this, we can do this:

```js
const Todo = mongoose.models.Todo || mongoose.model("Todo", todo);
```
