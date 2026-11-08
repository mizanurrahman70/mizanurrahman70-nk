const path = require("path");
const fs = require("fs-extra");

const PACKAGE_NAME = "@mizanurrahman70/nk";

const SCRIPTS = {
  lint: "eslint",
  "lint:fix": "eslint --fix",
  typecheck: "tsc --noEmit",
};

function devDependenciesFor(pkg, version) {
  const nextVersion = (pkg.dependencies && pkg.dependencies.next) || "latest";
  return {
    [PACKAGE_NAME]: `^${version}`,
    eslint: "^9",
    "eslint-config-next": nextVersion,
  };
}

function detectIndent(raw) {
  const match = raw.match(/^[ \t]+(?=")/m);
  return match ? match[0] : 2;
}

function mergeSection(section, additions, force) {
  const changes = [];
  for (const [key, value] of Object.entries(additions)) {
    const current = section[key];
    if (current === value) continue;
    if (current === undefined) {
      section[key] = value;
      changes.push({ key, value, action: "added" });
      continue;
    }
    if (!force) {
      changes.push({ key, value: current, action: "kept" });
      continue;
    }
    section[key] = value;
    changes.push({ key, value, action: "updated" });
  }
  return changes;
}

function isDependency(pkg, name) {
  return Boolean(pkg.dependencies && pkg.dependencies[name]);
}

async function mergePackageJson({ cwd, force, version }) {
  const file = path.join(cwd, "package.json");
  const raw = await fs.readFile(file, "utf8");
  const pkg = JSON.parse(raw);

  pkg.scripts = pkg.scripts || {};
  pkg.devDependencies = pkg.devDependencies || {};

  const wanted = devDependenciesFor(pkg, version);
  const devAdditions = Object.fromEntries(
    Object.entries(wanted).filter(([name]) => !isDependency(pkg, name))
  );

  const scripts = mergeSection(pkg.scripts, SCRIPTS, force);
  const devDependencies = mergeSection(pkg.devDependencies, devAdditions, force);

  const changed = [...scripts, ...devDependencies].some((change) => change.action !== "kept");
  if (changed) await fs.writeFile(file, `${JSON.stringify(pkg, null, detectIndent(raw))}\n`);

  return { scripts, devDependencies, changed };
}

module.exports = { mergePackageJson, PACKAGE_NAME };
