// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     formats: ["image/avif", "image/webp"],
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  basePath: "/velocity_webtech_solution",
};

export default nextConfig;
