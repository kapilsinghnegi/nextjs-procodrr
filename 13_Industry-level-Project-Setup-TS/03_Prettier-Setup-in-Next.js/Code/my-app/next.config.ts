/** @type {import('next').NextConfig} */

const folders = ["app", "lib", "models"];
const files = ["auth.ts", "proxy.ts", "eslint.config.mjs", "next.config.ts"];
const nextConfig = {
  eslint: {
    dirs: [...folders, ...files],
  },
};

export default nextConfig;
