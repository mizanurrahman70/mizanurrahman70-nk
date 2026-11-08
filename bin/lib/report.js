const useColor = process.stdout.isTTY && !process.env.NO_COLOR;
const paint = (code) => (text) => (useColor ? `\x1b[${code}m${text}\x1b[0m` : text);
const green = paint(32);
const yellow = paint(33);
const cyan = paint(36);
const dim = paint(2);
const bold = paint(1);

const FILE_LABELS = {
  created: green("+ created    "),
  overwritten: yellow("~ overwritten"),
  merged: cyan("~ merged     "),
  skipped: dim("- skipped    "),
};

const PATCH_LABELS = {
  patched: green("+ patched"),
  ok: dim("= ok     "),
  manual: yellow("! manual "),
};

const CHANGE_LABELS = { added: green("+"), updated: yellow("~"), kept: dim("=") };

function heading(text) {
  console.log(`\n${bold(text)}`);
}

function printFiles(files) {
  const counts = files.reduce((acc, { status }) => ({ ...acc, [status]: (acc[status] || 0) + 1 }), {});
  const summary = Object.entries(counts).map(([status, count]) => `${count} ${status}`).join(", ");
  heading(`Files (${summary})`);
  for (const { file, status, reason } of files) {
    console.log(`  ${FILE_LABELS[status]}  ${file}${reason ? dim(`  (${reason})`) : ""}`);
  }
}

function printPackage({ scripts, devDependencies, changed }) {
  heading(`package.json${changed ? "" : dim(" (no changes)")}`);
  const rows = [
    ...scripts.map((change) => ({ ...change, section: "scripts" })),
    ...devDependencies.map((change) => ({ ...change, section: "devDependencies" })),
  ];
  for (const { section, key, value, action } of rows) {
    const note = action === "kept" ? dim("  (kept existing, use --force to replace)") : "";
    console.log(`  ${CHANGE_LABELS[action]} ${section}.${key}: ${value}${note}`);
  }
}

function printPatches(patches) {
  heading("Project patches");
  for (const { name, file, status, detail } of patches) {
    console.log(`  ${PATCH_LABELS[status]}  ${file || name}${dim(`  ${detail}`)}`);
  }
}

function printWarnings(warnings) {
  if (warnings.length === 0) return;
  heading(yellow("Warnings"));
  for (const warning of warnings) console.log(`  ! ${warning}`);
}

function printNextSteps(files) {
  const skipped = files.some(({ status }) => status === "skipped");
  heading("Next steps");
  console.log("  1. npm install");
  console.log("  2. npm run lint");
  console.log("  3. Open Claude Code. It will ask for brand colors, logo, audience and tone first.");
  if (skipped) console.log(dim("\n  Fresh create-next-app project? Run `npx nk init --force` to replace the boilerplate layout, page and styles."));
  console.log("");
}

function printReport({ files, pkg, patches, warnings }) {
  printFiles(files);
  printPackage(pkg);
  printPatches(patches);
  printWarnings(warnings);
  printNextSteps(files);
}

module.exports = { printReport };
