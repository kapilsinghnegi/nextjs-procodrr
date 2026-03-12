# Understanding Rendering Paradigms in Next.js

React only supported Client-Side Rendering (CSR) and Express only supported Server-Side Rendering (SSR).but then, Next.js came into the picture and supports different rendering paradigms like SSR, CSR, Static Site Generation (SSG), Incremental Static Regeneration (ISR).

Earlier, servers used to send the HTML code to the client (SSR) but then slowly as JavaScript developed, new rendering paradigm - client-side rendering (CSR) came into the picture where the dom was generated on the client side. CSR became popular due to JavaScript frameworks like React, Vue, and Angular.

A benefit of CSR was that it made websites feel like a web application, it gave the user a better experience with less page reloads. A drawback of CSR was that the websites built with CSR struggled for SEO since server used to send empty HTML code and browsers used to generate the HTML code on the client side and when the web crawlers visited the page, they couldn't find any content and also CSR is slower than SSR.

Then, Next.js came with an idea of combining best of both worlds. Next.js supports both CSR and SSR. It additionally supports Static Site Generation (SSG) and Incremental Static Regeneration (ISR) on the server-side. Next.js also give additional features to make website load faster and improve performance.
