/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
          },
        ],
      },
}
