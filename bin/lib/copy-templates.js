const path = require("path");
const fs = require("fs-extra");

const TEMPLATES_DIR = path.join(__dirname, "..", "..", "templates");
const RULES_BEGIN = "<!-- BEGIN:nk-rules -->";
const RULES_END = "<!-- END:nk-rules -->";

const ALTERNATES = {
  "eslint.config.mjs": ["eslint.config.js", "eslint.config.cjs", "eslint.config.ts", "eslint.config.mts"],
  "tailwind.config.mjs": ["tailwind.config.js", "tailwind.config.cjs", "tailwind.config.ts"],
};

async function listFiles(dir, base = dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? listFiles(full, base) : [path.relative(base, full)];
    })
  );
  return nested.flat().sort();
}

async function findAlternate(cwd, file) {
  for (const alternate of ALTERNATES[file] || []) {
    if (await fs.pathExists(path.join(cwd, alternate))) return alternate;
  }
  return null;
}

async function mergeClaudeMd(source, target, force) {
  const incoming = await fs.readFile(source, "utf8");
  const existing = await fs.readFile(target, "utf8");
  const start = existing.indexOf(RULES_BEGIN);

  if (start === -1) {
    await fs.writeFile(target, `${existing.trimEnd()}\n\n${incoming}`);
    return { status: "merged", reason: "appended nk rules block" };
  }
  if (!force) return { status: "skipped", reason: "nk rules block already present" };

  const end = existing.indexOf(RULES_END, start) + RULES_END.length;
  await fs.writeFile(target, existing.slice(0, start) + incoming.trim() + existing.slice(end));
  return { status: "overwritten", reason: "replaced nk rules block" };
}

async function copyOne({ cwd, file, force }) {
  const source = path.join(TEMPLATES_DIR, file);
  const target = path.join(cwd, file);
  const exists = await fs.pathExists(target);

  if (file === "CLAUDE.md" && exists) return mergeClaudeMd(source, target, force);

  const alternate = await findAlternate(cwd, file);
  if (alternate) return { status: "skipped", reason: `project already has ${alternate}` };

  if (exists && !force) return { status: "skipped", reason: "already exists" };

  await fs.copy(source, target, { overwrite: true });
  return { status: exists ? "overwritten" : "created" };
}

async function copyTemplates({ cwd, force }) {
  const files = await listFiles(TEMPLATES_DIR);
  const results = [];
  for (const file of files) {
    const result = await copyOne({ cwd, file, force });
    results.push({ file: file.split(path.sep).join("/"), ...result });
  }
  return results;
}

module.exports = { copyTemplates };
