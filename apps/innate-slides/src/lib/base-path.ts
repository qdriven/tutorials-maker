/**
 * 静态导出（GitHub Pages）时的站点前缀。
 * NEXT_PUBLIC_ 变量在构建期内联进产物；dev / 自托管时为空串，行为不变。
 * <Link> 会自动带 basePath，只有 iframe src / fetch / window.open 这些
 * 不走 Next 路由的裸路径需要手动补。
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`
}
