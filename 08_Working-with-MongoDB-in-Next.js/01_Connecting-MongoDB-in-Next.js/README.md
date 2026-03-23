# Connecting to MongoDB in Next.js

To use MongoDB in Next.js, we will first install `mongoose` which is like an ODM (Object Data Modeling) package for MongoDB. After installing mongoose, we will add our mongodb connection string in `.env` file.

We'll create a `lib` folder for db-related files and common files and create `connectDB.js` file in it. To connect to the database, we'll write:

```js
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

await mongoose.connect(DB_URI);
console.log("Database connected");

// mongoose.model("Todo", {});

const db = mongoose.connection.db;
export default db;
```

Now, we'll add `db` in our routes file.

```js
import db from "@/lib/connectDB";
```

It's good practice to create a function for connecting to the database and export it from the file.

```js
// @/lib/connectDB.js
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

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

// @/app/todos/route.js
import mongoose from "mongoose";
import { readFile, writeFile } from "fs/promises";
import { connectDB } from "@/lib/connectDB";
import todos from "../../todos";

await connectDB();

export async function GET() {
  await connectDB();

  const result = await mongoose.connection.db
    .collection("todos")
    .insertOne({ title: "Learn Node.js", completed: false });
  console.log(result);
  const todosJSONString = await readFile("./todos.json", "utf-8");
  const todos = JSON.parse(todosJSONString);
  return Response.json(todos);
}
```
