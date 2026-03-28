# What are Server Actions in Next.js?

Server Actions are in a way replacement for API routes. What happens in Server Actions is that we create functions on server-side that get called on the client-side. Server Actions are also called Server Functions.

A Server Function is an asynchronous function that runs on the server. You can call them from the client through a network request, which is why they must be asynchronous. In an action or mutation context, they are also called Server Actions.

To use Server Actions, we need to make a component a Server Component. A Server Function can be defined by using the use server directive. You can place the directive at the top of an asynchronous function to mark the function as a Server Function, or at the top of a separate file to mark all exports of that file. Server Actions get `formData` as an argument.

```js
export default function Page() {
  // Server Action
  async function createPost(formData: FormData) {
    'use server'
    // ...
  }

  return <></>
}
```

The data we return is going to be sent back to the client. To get data from our form component, we can set `action` as the server action but make sure that we have `name` property on our input fields. This action is an abstraction over the use of event handlers. We can also use `formAction` attribute on submit button instead of using `action` attribute on form, they both have same behavior. To get values from `formData`, we can use `formData.get('name')`. We can perform server code in Server Actions because it will not be sent to the client, it will run on the server.

```js
import Link from "next/link";

export default function RegisterPage() {
  async function registerUser(formData) {
    "use server";
    console.log(formData);
    console.log(formData.get("name"));
    console.log(formData.get("email"));
    console.log(formData.get("password"));
    return { message: "Data received" };
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-lg">
        <header className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-600">
            Todo App
          </h1>
        </header>
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value="ProCodrr"
              readOnly
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value="procodrr@gmail.com"
              readOnly
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value="123456"
              readOnly
              required
              className="mt-1 w-full px-4 py-2 border rounded-md bg-white dark:bg-gray-900 dark:text-white"
            />
          </div>
          <button
            type="submit"
            formAction={registerUser}
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white py-2 rounded-md font-medium hover:opacity-90"
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
