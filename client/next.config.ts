import type { NextConfig } from "next";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
});

dotenvExpand.expand(dotenv.config({
  path: `./.env.${process.env.NODE_ENV}`,
}));

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
};

export default nextConfig;
