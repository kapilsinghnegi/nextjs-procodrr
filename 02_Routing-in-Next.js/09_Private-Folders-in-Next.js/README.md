# Private Folders in Next.js

If we want to crete a folder but don't want to make a route, then we can create Private Folders in Next.js. To create a Private Folder, we just need to add `_` at the start of the folder name. When we add underscore at the start of the folder name, Next.js acts as if the route of that folder doesn't exist.

If you still want to create a route starting with underscore but not want to make a Private Folder, then you can prefix the folder name with `%5F`.

Many developers move the folder out of the `app` directory if they don't want to make a route for that folder.
