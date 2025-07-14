const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
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