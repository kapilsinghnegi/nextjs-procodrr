# Edge Runtime in Next.js

Whenever we deploy Next.js app or any Node Server on cloud, we have a machine that is physically located somewhere in the world. But if our app has global users, then as the distance of user from server increases, the performance of the app will decrease as there will be delay in communication between user and server. To solve this problem, Edge Computing came into the picture.

In Edge Computing, our code is deployed on multiple servers in different regions and requests from user is sent to the closest server. CDN also works on the same principle. The difference between CDN and Edge Computing is that CDN only serves static content and Edge Computing also supports dynamic content.

When we deploy Next.js application on Vercel, `proxy` part is deployed on Edge so that `proxy` part stays fast. To keep our code fast on Edge, Next.js keeps that part lightweight.

Edge Servers are of two types: one that keeps running continuously and others that only run when a request is received. Vercel has created their own runtime called Edge Runtime. It is a combination of Next.js and Edge Computing. Next.js hasa two server runtimes: Node.js(default) for all pages, routes, and route-handlers and Edge Runtime for middleware/proxy. We can change runtime for a Server component by exporting `runtime` variable from Server Component with value as either `edge` or `nodejs`.

```js
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function About() {
  const cookieStore = await cookies();
  if (!cookieStore.get("sid")) redirect("/login");
  return <div>About page</div>;
}
```

The code that gets executed on Edge Runtime are called Edge Functions. we can't do any work related to Node.js, Database, File Operations, etc. on Edge Runtime.
