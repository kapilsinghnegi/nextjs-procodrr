# Building Reusable Layouts using layout.js file

We have `layout.js` file in `pages` directory which is used to display the same layout in multiple pages of our app. We can create different `layout.js` file in different directories to create different layouts for different pages of our app. Every route can contain only one `layout.js` file.

Whatever we put inside `layout.js` file of children route will eventually be children of the parent route's layout. So we have to check our html tags inside `layout.js` file as per different levels so that we can display the layout correctly.
