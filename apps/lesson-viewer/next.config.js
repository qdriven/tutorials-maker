/** @type {import('next').NextConfig} */
const nextConfig = {
  // 被 webshell :4020 iframe 嵌入时，允许壳 origin 拉 /_next/* 与 HMR。
  allowedDevOrigins: ["http://localhost:4020"],
  distDir: "dist",
  // @innate/ui 源码直出（workspace 指向 packages/ui），需要转译
  transpilePackages: ["@innate/ui"],
}

module.exports = nextConfig
