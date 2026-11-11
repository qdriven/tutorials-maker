/**
 * setup.mjs — 组装 univer-xsum 可运行态。
 *
 * 测试课只入库**课程专属物**（course.config.json / lesson.js）；模板拷贝物
 * （index.html / theme.css / univer/engine.js / univer/dist/*）运行前从
 * templates/univer/ 现取——共享源唯一，消除拷贝漂移。
 *
 * 用法：node scripts/tutorial/smoke/setup.mjs
 */
import { cpSync, mkdirSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const HERE = dirname(fileURLToPath(import.meta.url))
const TPL = resolve(
  HERE,
  "..", "..", "..",
  "skill", "excel-tutorial-maker", "templates", "univer"
)
const COURSE = join(HERE, "univer-xsum")

mkdirSync(join(COURSE, "univer", "dist"), { recursive: true })
for (const f of ["index.html", "theme.css"]) {
  cpSync(join(TPL, f), join(COURSE, f))
}
cpSync(join(TPL, "engine.js"), join(COURSE, "univer", "engine.js"))
cpSync(join(TPL, "dist"), join(COURSE, "univer", "dist"), { recursive: true })
console.log(`✔ univer-xsum 已组装（模板源 ${TPL}）`)
