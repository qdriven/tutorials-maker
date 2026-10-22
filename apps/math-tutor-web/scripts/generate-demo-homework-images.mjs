import { execFileSync } from 'node:child_process';
import { mkdtempSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUTPUT_DIR = new URL('../public/demo/', import.meta.url);
const FONT_STACK = 'Marker Felt, Bradley Hand, Comic Sans MS, Chalkboard SE, sans-serif';
const INK = '#111827';
const FAINT_INK = '#6b7280';
const PAPER = '#fffdf8';
const BLUE = '#2563eb';

const demos = [
  {
    fileName: 'demo-math-equation.png',
    title: 'Start with x',
    lines: ['2x + 3 = 11', 'x = ?'],
  },
  {
    fileName: 'demo-linear-equation.png',
    title: 'Variables both sides',
    lines: ['4(x - 3) = 2x + 10', 'x = ?'],
  },
  {
    fileName: 'demo-fraction-equation.png',
    title: 'Solve the fraction equation',
    lines: ['(x + 2) / 3', '+ (x - 1) / 2 = 5', 'x = ?'],
  },
  {
    fileName: 'demo-system-equations.png',
    title: 'Solve the system',
    lines: ['2x + y = 11', 'x - y = 1', 'x = ?, y = ?'],
  },
  {
    fileName: 'demo-quadratic-factor.png',
    title: 'Factor to solve',
    lines: ['x² - 5x + 6 = 0', 'x = ?'],
  },
  {
    fileName: 'demo-advanced-quadratic.png',
    title: 'Harder quadratic',
    lines: ['2x² - 7x - 4 = 0', 'x = ?'],
  },
];

function escapeXml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderSvg(demo) {
  const lineElements = demo.lines
    .map((line, index) => {
      const y = 340 + index * 170;
      const fontSize = index === demo.lines.length - 1 ? 86 : line.length > 14 ? 88 : 112;
      const color = line.includes('?') ? INK : INK;
      return `<text x="150" y="${y}" font-family="${FONT_STACK}" font-size="${fontSize}" fill="${color}" letter-spacing="0">${escapeXml(line)}</text>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#0f172a" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="1200" height="1200" fill="#eef5ff"/>
  <rect x="84" y="92" width="1032" height="1016" rx="34" fill="${PAPER}" filter="url(#shadow)"/>
  <rect x="84" y="92" width="1032" height="1016" rx="34" fill="none" stroke="#dbe7f7" stroke-width="3"/>
  <text x="150" y="205" font-family="SF Pro, Helvetica, Arial, sans-serif" font-size="34" font-weight="700" fill="${BLUE}" letter-spacing="3">${escapeXml(demo.title.toUpperCase())}</text>
  ${lineElements}
  <path d="M148 940 C330 900, 520 970, 790 925" fill="none" stroke="${FAINT_INK}" stroke-width="8" stroke-linecap="round" opacity="0.28"/>
  <text x="150" y="1015" font-family="${FONT_STACK}" font-size="54" fill="${FAINT_INK}" opacity="0.55">show your steps</text>
</svg>`;
}

for (const demo of demos) {
  const tempDir = mkdtempSync(join(tmpdir(), 'math-tutor-demo-'));
  const svgPath = join(tempDir, demo.fileName.replace(/\.png$/, '.svg'));
  const quickLookPngPath = `${svgPath}.png`;
  const outputPath = new URL(demo.fileName, OUTPUT_DIR);

  try {
    writeFileSync(svgPath, renderSvg(demo), 'utf8');
    execFileSync('qlmanage', ['-t', '-s', '1200', '-o', tempDir, svgPath], {
      stdio: 'ignore',
    });
    renameSync(quickLookPngPath, outputPath);
    console.log(`Generated ${outputPath.pathname}`);
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}
