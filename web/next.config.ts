import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Evita mismatch de hidratación en MetadataWrapper (streaming vs blocking).
  // https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots
  htmlLimitedBots: /.*/,
};

export default nextConfig;
