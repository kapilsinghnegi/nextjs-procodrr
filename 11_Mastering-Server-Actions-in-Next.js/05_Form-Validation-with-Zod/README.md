# Form Validation with Zod

Zod is a popular library for form validation in Next.js. We can use Zod to validate form data before sending it to the server. This can help prevent errors and improve the user experience.
To use Zod, we need to install it and import it in our project. `npm install zod`

We will then make schema for our form using Zod.

```js
// @/lib/schema/userSchema.js
import * as z from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(30, "Name must be at most 30 characters long"),
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
    ),
});
```

We can then use the schema to validate the form data before sending it to the server.

```js
"use client";

import { useActionState, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/app/actions/userAction";
import { registerSchema } from "@/lib/schema/userSchema";
import z from "zod";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, {});
  const [name, setName] = useState("ProCodrr");
  const [email, setEmail] = useState("procodrr@gmail.com");
  const [password, setPassword] = useState("ABcd1234");
  const [errors, setErrors] = useState({});

  const handleFormAction = async formData => {
    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const { data, error, success } = registerSchema.safeParse(newUser);

    if (!success) {
      return setErrors(z.flattenError(error).fieldErrors);
    }

    setErrors({});
    return formAction(data);
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

We have validated the form data using Zod and now we can use it to register the user. We have validated on client side but we should not rely on client side validation alone as user can manipulate the form data to bypass the validation. Client-side code is not secure and should not be used for sensitive data. Therefore, we should use server-side validation to validate the form data before sending it to the server.

```js
"use server";

import { registerSchema } from "@/lib/schema/userSchema";

export async function registerUser(_, formData) {
  console.log(formData);
  const { data, error, success } = registerSchema.safeParse(newUser);

  if (!success) {
    console.log(z.flattenError(error).fieldErrors);
    return { errors: z.flattenError(error).fieldErrors };
  }
  return { message: `${formData.email} registered`, data };
}
```

```js
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/app/actions/userAction";
import { registerSchema } from "@/lib/schema/userSchema";
import z from "zod";

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, {});
  const [name, setName] = useState("ProCodrr");
  const [email, setEmail] = useState("procodrr@gmail.com");
  const [password, setPassword] = useState("ABcd1234");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(state.errors);
  }, [state.errors]);

  const handleFormAction = async formData => {
    const newUser = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const { data, error, success } = registerSchema.safeParse(newUser);

    if (!success) {
      return setErrors(z.flattenError(error).fieldErrors);
    }

    setErrors({});
    return formAction(data);
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
            {errors?.name && (
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
            {errors?.email && (
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
            {errors?.password && (
              <p className="text-xs text-red-500 mt-1 -mb-2">
                {errors.password}
              </p>
            )}
          </div>
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
