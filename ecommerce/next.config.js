const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/studio/:path*',
                destination: '/sanity-studio/dist/:path*',
            },
        ]
    },
};

module.exports = nextConfig;