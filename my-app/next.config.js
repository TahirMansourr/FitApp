/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        customKey: 'my-value',
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
            port: '3000',
            pathname: '/account123/**',
          },
        ],
      },
    // experimental: {
    //     serverActions: true,
    //     serverComponentsExternalPackages: ["mongoose"],
    //   },
}

module.exports = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
          },
        ],
      },
}
