# Using Server Actions in Client Components

It's not possible to define Server Functions in Client Components. However, you can invoke them in Client Components by importing them from a file that has the "use server" directive at the top of it:

```js
"use server";

export async function registerUser(formData) {
  console.log(formData);
  console.log(formData.get("name"));
  console.log(formData.get("email"));
  console.log(formData.get("password"));
  return { message: "Data received" };
}
```

We can either put this file in the same directory as the Client Component, or we can create a new directory outside the app directory named actions and put this file in that directory.
