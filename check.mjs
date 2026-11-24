import { existsSync } from "node:fs";

const PACKAGE = "sass-embedded-all-unknown";
// The package declares cpu: ["!arm", "!arm64", "!riscv64", "!x64"].
const EXCLUDED_CPUS = ["arm", "arm64", "riscv64", "x64"];

const platform = `${process.platform}-${process.arch}`;

// npm creates no node_modules when it skips the only dependency.
if (!existsSync("node_modules") && !existsSync("package-lock.json")) {
  console.error("Nothing installed: run `yarn install` or `npm install` first");
  process.exit(2);
}

const installed = existsSync(`node_modules/${PACKAGE}/package.json`);

if (installed && EXCLUDED_CPUS.includes(process.arch)) {
  console.error(
    `FAIL ${platform}: ${PACKAGE} is installed, but its cpu field excludes ${process.arch}`,
  );
  process.exit(1);
}

console.log(
  `OK ${platform}: ${PACKAGE} is ${installed ? "installed" : "not installed"}, as expected`,
);
process.exit(0);
