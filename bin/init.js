#!/usr/bin/env node
const path = require("path");
const fs = require("fs-extra");
const { version } = require("../package.json");
const { copyTemplates } = require("./lib/copy-templates");
const { mergePackageJson } = require("./lib/merge-package-json");
const { patchEslintConfig, patchGlobalsCss } = require("./lib/patch-project");
const { printReport } = require("./lib/report");

const HELP = `
nk ${version} - Claude Code rules + Next.js standards for client proposal sites

Usage
  npx nk init            Copy rules, skills, tokens and starter components
  npx nk init --force    Overwrite files that already exist

Options
  -f, --force            Overwrite existing files and package.json entries
  -h, --help             Show this help
  -v, --version          Show version
`;

function parseArgs(argv) {
  const flags = new Set(argv.filter((arg) => arg.startsWith("-")));
  return {
    command: argv.find((arg) => !arg.startsWith("-")),
    force: flags.has("--force") || flags.has("-f"),
    help: flags.has("--help") || flags.has("-h"),
    version: flags.has("--version") || flags.has("-v"),
  };
}

async function detectWarnings(cwd) {
  const hasRootApp = await fs.pathExists(path.join(cwd, "app"));
  const hasSrcApp = await fs.pathExists(path.join(cwd, "src", "app"));
  if (!hasRootApp || hasSrcApp) return [];
  return [
    "This project uses ./app at the root. nk follows the src/ layout, and Next.js ignores src/app while ./app exists. Move app/ into src/ (and update the @/* path in tsconfig.json).",
  ];
}

async function init({ cwd, force }) {
  if (!(await fs.pathExists(path.join(cwd, "package.json")))) {
    throw new Error("No package.json found. Run `npx nk init` from the root of your Next.js project.");
  }

  const warnings = await detectWarnings(cwd);
  const files = await copyTemplates({ cwd, force });
  const pkg = await mergePackageJson({ cwd, force, version });
  const patches = [await patchEslintConfig({ cwd }), await patchGlobalsCss({ cwd })];

  printReport({ files, pkg, patches, warnings });
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (args.version) return console.log(version);
  if (args.help || !args.command) return console.log(HELP);
  if (args.command !== "init") {
    console.error(`Unknown command "${args.command}".`);
    console.log(HELP);
    process.exitCode = 1;
    return;
  }

  await init({ cwd: process.cwd(), force: args.force });
}

main().catch((error) => {
  console.error(`\nnk: ${error.message}`);
  process.exitCode = 1;
});
