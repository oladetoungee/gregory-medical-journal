/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'gregory-medical-journal-backend-production.up.railway.app'],
  },
  trailingSlash: false, // This ensures that URLs don't require a trailing slash
};

export default nextConfig;
