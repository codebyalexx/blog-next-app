/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    GOOGLE_TRANSLATION_CONFIG: JSON.stringify({
      languages: [
        { title: "English", name: "en" },
        { title: "Français", name: "fr" },
      ],
      defaultLanguage: "en",
    }),
  },
};

export default nextConfig;
