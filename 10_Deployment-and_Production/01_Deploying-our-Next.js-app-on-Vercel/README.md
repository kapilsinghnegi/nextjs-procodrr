# Deploying our Next.js app on Vercel

Vercel is the same company that built Next.js and is the most popular platform for deploying Next.js apps. If we want we can deploy our Next.js app on AWS EC2 instances as well but then we'll not be able to use some exclusive features of Next.js like Image Optimization, CDN caching, etc.

To deploy our Next.js app on Vercel, we need to login to Vercel and we can then import our github repository. If there are any environment variables that we want to set, we can set them in the Vercel dashboard. After that, we can click on `Deploy` button and our app will be deployed on Vercel. It will automatically build and deploy our app on Vercel.

If we want to change something in our app, we can commit our changes to the repository's main branch and then Vercel will automatically build and deploy our app on Vercel.

To connect a custom domain to our app, we can go to `Project Settings` in Vercel dashboard and click on `Domains` tab. Then, we can click on `Add Domain`. After that, we can enter the domain url, connect to `Production` environment and then click on `Save`. Now, to verify DNS record, we have to go to the domain's DNS settings and add new records for the domain given by Vercel. After some time, we can see our app on the domain url.
