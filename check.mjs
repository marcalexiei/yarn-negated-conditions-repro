import { existsSync } from "node:fs";

const PACKAGE = "sass-embedded-all-unknown";
// The package declares cpu: ["!arm", "!arm64", "!riscv64", "!x64"].
const EXCLUDED_CPUS = ["arm", "arm64", "riscv64", "x64"];

const platform = `${process.platform}-${process.arch}`;

if (!existsSync("node_modules")) {
  console.error("No node_modules: run `yarn install` first");
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
