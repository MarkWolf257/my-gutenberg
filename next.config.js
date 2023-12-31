/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['www.gutenberg.org'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.gutenberg.org',
                port: '',
                pathname: '/cache/epub/**',
            }
        ]
    }
}

module.exports = nextConfig
