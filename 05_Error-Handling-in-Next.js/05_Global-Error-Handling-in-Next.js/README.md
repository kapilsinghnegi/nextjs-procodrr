# Global Error Handling in Next.js

Error handling in root route is little complicate as it is base parent route and it can handle errors of all child routes but if there's an error in its `layout` then we can't have an `error.js` file in its parent route.
For handling this, we have `global-error.js` file which is a parent route of all routes.

Global error UI must define its own <html> and <body> tags, global styles, fonts, or other dependencies that your error page requires. This file replaces the root layout or template when active. Global error is only handled in production mode.
