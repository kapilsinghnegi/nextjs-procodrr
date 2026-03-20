# Image Optimization in Next.js

Next.js provides us `Image` component from `next/image` for image optimization. It needs a `height`, `width`, `src`, and `alt` prop to render the image. It converts our image files to webp format on the fly for faster loading.

We can control quality of images using `quality` prop which can be a number between 1 and 100 and defaults to 75.

It provides us responsive images out of the box maintaining aspect ratio.

There is one more property `unoptimized` which is used to disable image optimization and load the image as it is. We should not use this property for production as it will increase the size of our bundle.'

Next.js by default does not allow external websites links. To use them, we have to configure them in `next.config.js` file.

```js
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "*.unsplash.com" }],
  },
};

export default nextConfig;
```

We can also pass a property `loader` which is basically a function which received props as object which contains the `src`, `width`, `quality` etc. and returns an object which contains `src`, `width`, `quality` etc.. It is used to control the properties when we get images from providers like Cloudinary.
