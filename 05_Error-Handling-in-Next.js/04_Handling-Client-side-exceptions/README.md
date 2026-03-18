# Handling Client-side exceptions in Next.js

In case of error where rendering blocks, our app crashes. If there's any error caused in server-side then, it will cause a rendering error. In case of client-side, we will either have errors that will not cause any rendering issue or rendering errors. These errors are solved by hard refresh of the page.

To solve client-side exceptions that cause rendering errors, we can use the `error.js` file.
