/** @type {import("next').NextConfig} */
module.exports = {
  images: 
  { 
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // pathname: "https://res.cloudinary.com/**",
      },
    ],
    // domains: ["res.cloudinary.com"], 
    // formats: ["image/avif", "image/webp"], 
  }
}