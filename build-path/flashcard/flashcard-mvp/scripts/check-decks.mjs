/**
 * Deck 体检：不进浏览器，直接跑解析管线，验证 content/decks/*.md 的数据合法性。
 *
 * 用法：node scripts/check-decks.mjs [deck文件名…]
 * 不带参数 = 检查全部 deck。
 *
 * 检查项：
 * - parseDeck 能解析 frontmatter / 分卡 / 指令
 * - :::stage 的 YAML 过 parseStageBody 校验（节点/边/步骤引用、highlight 范围）
 * - :::quiz 的 answer 下标在选项范围内、选项非空
 * - :::flip 有 front/back
 */
import { createJiti } from "jiti";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jiti = createJiti(import.meta.url);
const { parseDeck } = await jiti.import(join(root, "src", "lib", "cards.ts"));
const { parseStageBody } = await jiti.import(join(root, "src", "lib", "stage.ts"));

const decksDir = join(root, "content", "decks");
const targets = process.argv.slice(2).length
  ? process.argv.slice(2).map((name) => (name.endsWith(".md") ? name : `${name}.md`))
  : readdirSync(decksDir).filter((name) => name.endsWith(".md"));

let failed = 0;
for (const file of targets) {
  const path = join(decksDir, file);
  let deck;
  try {
    deck = parseDeck(readFileSync(path, "utf8"), file);
  } catch (error) {
    console.error(`✗ ${file}: parseDeck 抛错 — ${error.message}`);
    failed++;
    continue;
  }

  const problems = [];
  if (!deck.meta.id) problems.push("frontmatter 缺 id");
  if (deck.cards.length === 0) problems.push("没有任何卡片");

  for (const [index, card] of deck.cards.entries()) {
    const at = `第 ${index + 1} 张（${card.type}）`;
    if (card.type === "stage") {
      const stage = parseStageBody(card.directiveBody ?? "");
      if (stage.errors.length) {
        problems.push(`${at}: stage 校验失败 — ${stage.errors.join("；")}`);
      }
    } else if (card.type === "quiz") {
      const lines = (card.directiveBody ?? "").split("\n");
      let answer = -1;
      let options = 0;
      for (const raw of lines) {
        const line = raw.trim();
        if (line.startsWith("answer:")) answer = Number.parseInt(line.slice(7).trim(), 10);
        else if (line.startsWith("- ")) options++;
      }
      if (options < 2) problems.push(`${at}: 选项少于 2 个`);
      if (answer < 0 || answer >= options) problems.push(`${at}: answer=${answer} 超出选项范围（${options} 个）`);
    } else if (card.type === "flip") {
      const body = card.directiveBody ?? "";
      if (!body.includes("front:")) problems.push(`${at}: 缺 front:`);
      if (!body.includes("back:")) problems.push(`${at}: 缺 back:`);
    }
  }

  if (problems.length) {
    failed++;
    console.error(`✗ ${file}（${deck.meta.id}，${deck.cards.length} 张卡）:`);
    for (const problem of problems) console.error(`    - ${problem}`);
  } else {
    const types = deck.cards.reduce((acc, card) => {
      acc[card.type] = (acc[card.type] ?? 0) + 1;
      return acc;
    }, {});
    const summary = Object.entries(types).map(([type, n]) => `${type}×${n}`).join(" ");
    console.log(`✓ ${file}（${deck.meta.id}，${deck.cards.length} 张卡）: ${summary}`);
  }
}

process.exit(failed ? 1 : 0);
