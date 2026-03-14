# Server Components vs Client Components

By default, every component is a Server Component. Server components are components that are executed only on the server-side whereas Client components get executed on the server-side as well as the client-side. Client components first execute on server and then its code is sent to the client and then, they get executed on the browser.

```js
"use client";
```

To make a Server Component a Client Component, we need to use the `use client` directive at the top of the file. React hooks can only be used in a Client Component. If we make a parent component a Client Component, then its children will also become Client Components. When code of client component is executed on Server, it returns an html page without executing React hooks, event listeners, etc.

```js
"use client";

import { useState } from "react";

export default function Likes() {
  const [likes, setLikes] = useState(0);
  return <div onClick={() => setLikes(likes => likes + 1)}>{likes} Likes</div>;
}
```
