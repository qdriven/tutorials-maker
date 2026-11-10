#!/usr/bin/env node
// 在临时目录打包并实际安装，逐个核对 npm 消费者收到的角色正文。
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));
const scratch = mkdtempSync(join(tmpdir(), 'agency-package-check-'));
const env = { ...process.env, npm_config_cache: join(scratch, 'cache') };
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const run = args => execFileSync(npm, args, { cwd: root, env, encoding: 'utf8' });

try {
  const destination = join(scratch, 'dist');
  mkdirSync(destination);
  const [packed] = JSON.parse(run([
    'pack', '--json', '--ignore-scripts', '--pack-destination', destination,
  ]));
  const installed = join(scratch, 'consumer');
  run([
    'install', '--prefix', installed, '--ignore-scripts', '--no-audit', '--no-fund',
    '--package-lock=false', join(destination, packed.filename),
  ]);
  const packageRoot = join(installed, 'node_modules', manifest.name);
  const received = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
  assert.equal(received.name, manifest.name);
  assert.equal(received.version, manifest.version);

  let count = 0;
  const walk = (directory, prefix) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue;
      const relative = join(prefix, entry.name);
      if (entry.isDirectory()) walk(join(directory, entry.name), relative);
      else if (entry.isFile() && entry.name.endsWith('.md')) {
        const source = readFileSync(join(root, relative), 'utf8');
        const frontmatter = source.match(/^---\n([\s\S]*?)\n---/);
        if (!frontmatter || !/^name:/m.test(frontmatter[1])) continue;
        assert.equal(readFileSync(join(packageRoot, relative), 'utf8'), source, relative);
        count++;
      }
    }
  };
  for (const directory of manifest.files.filter(path => path.endsWith('/'))) {
    walk(join(root, directory), directory);
  }
  const advertised = Number(manifest.description.match(/^(\d+) 个/)[1]);
  assert.equal(count, advertised, '打包角色数与包描述不一致');
  assert(readFileSync(join(packageRoot, 'LICENSE'), 'utf8').includes('MIT'));
  assert(!packed.files.some(file => /(^|\/)(\.npmrc|\.env|node_modules)(\/|$)/.test(file.path)));
  console.log(`✅ ${manifest.name}@${manifest.version} 本地打包、安装和 ${count} 个角色正文核对通过`);
} finally {
  rmSync(scratch, { recursive: true, force: true });
}
