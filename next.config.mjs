/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'gregory-medical-journal-backend.onrender.com'],
  },
  trailingSlash: false, // This ensures that URLs don't require a trailing slash
};

export default nextConfig;
