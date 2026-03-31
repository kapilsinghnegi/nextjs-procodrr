# Calling Server Actions Manually

We can call Server Actions manually by using `onSubmit` event handler on form and call our Server Action function inside it. In this case, Server action only receives `formData` as an argument and not `previousData` and `formData` is the same object that we get from `event.target` in `onSubmit` handler. We can get the value from `formData` directly now using dot notation and we don't need to use `get` method anymore as it is not JavaScript's Native FormData Constructor anymore, but is a regular JavaScript object. Behind the scenes, Server Actions are called on server-side, they send fetch api request to the server and receive response from the server. We can get formData on page for basic validation by getting it from `new FormData(e.target)`. We usually don't call server actions manually and use `useActionState` hook to get data from server actions.

## Basic Validation Code

```js
// @/app/actions/userActions.js
"use server";

export async function registerUser(formData) {
  console.log(formData);
  return { message: `${formData.email} registered` };
}

// @/app/register/page.js
("use client");

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/app/actions/userAction";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("ProCodrr");
  const [email, setEmail] = useState("procodrr@gmail.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const formErrors = {};
    if (newUser.name.length < 3) {
      formErrors.name = "Name must be at least 3 characters long.";
    }
    if (!newUser.email.includes("@")) {
      formErrors.email = "Invalid email.";
    }
    if (newUser.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(formErrors).length) return setErrors(formErrors);
    setErrors(formErrors);
    const res = await registerUser(newUser);
    if (!res.error) return router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-600">
            Todo App
          </h1>
        </header>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        {/* <form action={formAction} className="space-y-4"> */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 -mb-2">{errors.name}</p>
            )}
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
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 -mb-2">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 -mb-2">
                {errors.password}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md font-medium hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-75"
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

We can also provide the `handleSubmit` function in the above code snippet as action property to the form instead of `onSubmit` event handler but then, we will not receive any event, we will directly receive `formData` as an argument. Also we can call `formAction` from `useActionState` instead of `registerUser` in the above code snippet.

```js
// @/app/actions/userActions.js
"use server";
export async function registerUser(_, formData) {
  console.log(formData);
  return { message: `${formData.email} registered` };
}

// @/app/register/page.js
("use client");

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/actions/userAction";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, {});
  const [name, setName] = useState("ProCodrr");
  const [email, setEmail] = useState("procodrr@gmail.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({});

  const handleFormAction = async formData => {
    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const formErrors = {};
    if (newUser.name.length < 3) {
      formErrors.name = "Name must be at least 3 characters long.";
    }
    if (!newUser.email.includes("@")) {
      formErrors.email = "Invalid email.";
    }
    if (newUser.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
    }

    if (Object.keys(formErrors).length) return setErrors(formErrors);
    setErrors({});
    formAction(newUser);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-600">
            Todo App
          </h1>
        </header>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form action={handleFormAction} className="space-y-4" noValidate>
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
            {errors.name && (
              <p className="text-xs text-red-500 mt-1 -mb-2">{errors.name}</p>
            )}
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
            {errors.email && (
              <p className="text-xs text-red-500 mt-1 -mb-2">{errors.email}</p>
            )}
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
            {errors.password && (
              <p className="text-xs text-red-500 mt-1 -mb-2">
                {errors.password}
              </p>
            )}
          </div>
          <p className="text-xs text-green-500">{state?.message || ""}</p>
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
