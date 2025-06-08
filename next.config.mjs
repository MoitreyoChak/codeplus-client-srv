/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: ["https://codeplus.dev"],
    images: {
        domains: ['i.pinimg.com'], // allow external image hosts
    },
};

export default nextConfig;
