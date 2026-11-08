const path = require("path");
const fs = require("fs-extra");
const { PACKAGE_NAME } = require("./merge-package-json");

const ESLINT_CONFIGS = ["eslint.config.mjs", "eslint.config.js", "eslint.config.ts", "eslint.config.mts", "eslint.config.cjs"];
const GLOBALS_CSS = ["src/app/globals.css", "app/globals.css"];
const TAILWIND_IMPORT = /^@import\s+["']tailwindcss["'].*$/m;

async function findFirst(cwd, candidates) {
  for (const candidate of candidates) {
    if (await fs.pathExists(path.join(cwd, candidate))) return candidate;
  }
  return null;
}

function toPosix(relativePath) {
  const posix = relativePath.split(path.sep).join("/");
  return posix.startsWith(".") ? posix : `./${posix}`;
}

function insertAfterImports(source, line) {
  const imports = [...source.matchAll(/^import .*$/gm)];
  if (imports.length === 0) return `${line}\n${source}`;
  const last = imports[imports.length - 1];
  const at = last.index + last[0].length;
  return `${source.slice(0, at)}\n${line}${source.slice(at)}`;
}

function wrapDefaultExport(source) {
  const namedExport = /^export default ([A-Za-z_$][\w$]*);?\s*$/m;
  const match = source.match(namedExport);
  const base = match ? match[1] : "baseConfig";
  const body = match ? source.replace(namedExport, "") : source.replace(/^export default /m, "const baseConfig = ");
  return `${body.trimEnd()}\n\nconst nkConfig = [...[${base}].flat(), ...nk];\n\nexport default nkConfig;\n`;
}

async function patchEslintConfig({ cwd }) {
  const name = "eslint config";
  const file = await findFirst(cwd, ESLINT_CONFIGS);
  if (!file) return { name, status: "manual", detail: "no eslint.config.* found; add one that spreads @mizanurrahman_70/nk/eslint-config.js" };

  const source = await fs.readFile(path.join(cwd, file), "utf8");
  if (source.includes(PACKAGE_NAME)) return { name, file, status: "ok", detail: "nk rules already applied" };

  const exports = source.match(/^export default /gm) || [];
  if (file.endsWith(".cjs") || exports.length !== 1) {
    return { name, file, status: "manual", detail: `spread require("${PACKAGE_NAME}/eslint-config.js") into the exported config` };
  }

  const withImport = insertAfterImports(source, `import nk from "${PACKAGE_NAME}/eslint-config.js";`);
  await fs.writeFile(path.join(cwd, file), wrapDefaultExport(withImport));
  return { name, file, status: "patched", detail: "added nk lint rules (max-lines, no inline styles, no raw hex)" };
}

async function patchGlobalsCss({ cwd }) {
  const name = "globals.css";
  const file = await findFirst(cwd, GLOBALS_CSS);
  if (!file) return { name, status: "manual", detail: "no globals.css found; import brand.css and @config tailwind.config.mjs in your root stylesheet" };

  const fullPath = path.join(cwd, file);
  const source = await fs.readFile(fullPath, "utf8");
  if (source.includes("@config")) return { name, file, status: "ok", detail: "tailwind config already linked" };
  if (!TAILWIND_IMPORT.test(source)) return { name, file, status: "manual", detail: 'add @import "tailwindcss" first, then rerun nk init' };

  const dir = path.dirname(fullPath);
  const brand = toPosix(path.relative(dir, path.join(cwd, "src/app/brand.css")));
  const config = toPosix(path.relative(dir, path.join(cwd, "tailwind.config.mjs")));
  const lines = `@import "${brand}";\n@config "${config}";`;

  await fs.writeFile(fullPath, source.replace(TAILWIND_IMPORT, (match) => `${match}\n${lines}`));
  return { name, file, status: "patched", detail: "linked brand.css and the nk Tailwind preset. Remove the old boilerplate :root and @theme blocks." };
}

module.exports = { patchEslintConfig, patchGlobalsCss };
