# Streaming in Next.js

In traditional server-side rendering, the server produces the full HTML document before sending anything. A single slow database query or API call can block the entire page. Streaming changes this by using chunked transfer encoding to send parts of the response as they become ready. The browser starts rendering HTML while the server is still generating the rest.

For implementing this, we can use React's `Suspense` component. It allows us to delay rendering of a component until it is ready. It also provides a fallback UI while the component is still loading.

```jsx
...
import { Suspense } from "react";
import Loading from "@/components/Loading";
import Comments from "@/components/Comments";
import Likes from "@/components/Likes";
import Views from "@/components/Views";

const Blogs = () => {
  return (
    <>
      ...
      <div className="blog-links">
        <Suspense fallback={<Loading>Views</Loading>}>
            <Views />
        </Suspense>
        <Suspense fallback={<Loading>Likes</Loading>}>
            <Likes />
        </Suspense>
        <Suspense fallback={<Loading>Comments</Loading>}>
            <Comments />
        </Suspense>
      </div>
    </>
  );
};
```
