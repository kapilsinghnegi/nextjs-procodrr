# Understanding useActionsState Hook in Next.js

To access returned data from server actions in our code, we need to use the `useActionState` hook from `react` library. The concept of Server Actions is a React Concept of Server Functions. We will pass our server action function inside the `useActionState` hook and it returns an array and we can extract different values from it.

We receive three values from the `useActionState` hook: `state`, `formAction`, and `isPending`. `isPending` is a boolean value that indicates whether the server action is pending or not. We can use this value to show a loading indicator or disable the form while the server action is pending. By default, the `isPending` value is `false` and the value of `state` is `undefined`.

The value of `formAction` is a function that we can use to trigger the server action. We now will not directly pass our server action function to our form component, we will pass the `formAction` function as the `action` attribute on the form component now.

Also, whenever we use `useActionState` to create `formAction` and use it as `action` in our form component, we receive two parameters in our server action: `previousData` and `formData`. `previousData` is the data that was returned from the previous server action and `formData` is the data that was submitted in the form. We can pass second argument which will become initial value of the state.

We can't send status codes in our server actions, we can only send data. Server actions always work on POST requests and will always send `200` status code, even when we send errors.

```js
"use server";

export async function registerUser(previousData, formData) {
  // return { message: `${formData.get("email")} registered` };
  return { error: `${formData.get("email")} not registered` };
}
```

```js
"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/actions/userAction";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, {});
  console.log(state, isPending);
  const [name, setName] = useState("ProCodrr");
  const [email, setEmail] = useState("procodrr@gmail.com");
  const [password, setPassword] = useState("123456");

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-600">
            Todo App
          </h1>
        </header>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {/* <p className="text-xs text-green-500">{state?.message || ""}</p> */}
          <p className="text-xs text-red-500">{state?.error || ""}</p>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md font-medium hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-75"
            disabled={isPending}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
```
