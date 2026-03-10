# Metadata API in Next.js

Metadata is the extended information for your app, like title, description, and icons that is used by search engines and browsers. Next.js directs not to manually set metadata for your app, but instead to use the Metadata API. So, we should not add tags such as `<head>` or `<title>` in our app. Instead, we should use the Metadata API. To add metadata using the Metadata API, we should export a static metadata object or a dynamic generateMetadata function in a `layout.js` or `page.js` file. Another way to add static or dynamically generated special files to route segments.

We can also set our metadata object's title as an object with default and template values.
Eg. -

```js
const metadata = {
  title: {
    template: "%s | My App",
    default: "My App",
  },
};
```

Here, `%s` is a placeholder for the title of the page. So what will happen is that when we navigate to child pages, `%s` will be replaced with the title of the child page.

For dynamic metadata, we can use the `generateMetadata` function. It will be called for each route segment.

```js
export async function generateMetadata({ params }) {
  const { blogId } = await params;
  return {
    title: `Blog ${blogId}`,
  };
}
```

You can also set absolute property for the title of metadata which will override the default and template values.
