/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX,
    images: {
        loader: "custom",
        loaderFile: "./custom-image-loader.js",
    }
};

module.exports = nextConfig;
