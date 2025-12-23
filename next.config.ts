import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    qualities: [50, 75, 100],
    remotePatterns : [ 
      {
         protocol: "https",
        hostname: "rauhhujcxd.ufs.sh",
        pathname: "/f/**",
      }
    ]
  }
};

export default nextConfig;
