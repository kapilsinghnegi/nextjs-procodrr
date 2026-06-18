# Difference between Next.js and React.js

Next.js app is server-side rendered, while React.js app is client-side rendered.

In both the cases, Node.js server is running on the backend. In Vite, Babel compiles the code to plain JavaScript and then Browser used to run that code and create DOM elements. In Next.js, Babel compiles the code to plain JavaScript and then Node.js server runs that code and creates DOM elements and sends an HTML file to the browser.

In Vite, every component is a Client Component. In Next.js, by default, every component is a Server Component but we can make a component a Client Component by adding a `use client` directive at the top of the file.

Next.js additionally gives you many features that React.js doesn't have. For eg. - Server Components, Static Site Generation, Incremental Static Regeneration, and more.
