/** @type {import('next').NextConfig} */

// GitHub Pages 静态导出模式：STATIC_EXPORT=1 时启用
// （由 scripts/deploy-pages.mjs 与 .github/workflows/pages.yml 设置）。
// 项目站点挂在 /<repo>/ 子路径下，basePath/assetPrefix 与页面里的裸路径
// （iframe src、fetch、window.open）都要带上前缀，见 src/lib/base-path.ts。
const isStaticExport = process.env.STATIC_EXPORT === "1"
const pagesBasePath = process.env.PAGES_BASE_PATH ?? ""

const nextConfig = {
  // 被 webshell :4020 iframe 嵌入时，允许壳 origin 拉 /_next/* 与 HMR。
  allowedDevOrigins: ["http://localhost:4020"],
  distDir: "dist",
  // @innate/ui 源码直出（file: 指向 innate-fe 基座 packages/ui），需要转译
  transpilePackages: ["@innate/ui"],
  ...(isStaticExport
    ? {
        output: "export",
        // GitHub Pages 不做无扩展名 → .html 重写，目录式 /x/index.html 才能命中 /x/
        trailingSlash: true,
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath,
        // 静态导出没有图片优化服务
        images: { unoptimized: true },
      }
    : {}),
}

module.exports = nextConfig
