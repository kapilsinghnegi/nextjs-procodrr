# Understanding Auth Flow in Next.js

Normally, we have a React app and a Node.js app running on different ports. React Server is a Dumb Server which serves static files to the browser. Node.js Server is a Smart Server which handles logics and API calls. Auth flow happens when these two server communicate with each other.

When a user logins using their login credentials using Browser and Node.js Server validates the credentials and returns a cookie to the browser. A cookie is basically a HTTP Header which contains unique identifier of the user that is stored in the browser. This cookie is used to identify the user on the next requests.

Usually, this cookie contains session id which is used to identify the user on the server side. This is the best way to handle authentication in Next.js. Some people also use JWT tokens wrong way which is not the best way to handle authentication in Next.js.

Earlier, when there was no react and we used to render pages using EJS(server side rendering), we only had one codebase which was used for both client side and server side. The best thing about this was that there was no cors error since both servers are same. Next.js also supports this approach. But, EJS was backend-heavy while Next.js is frontend heavy. Mostly people use Next.js for frontend development and Node.js for backend development.