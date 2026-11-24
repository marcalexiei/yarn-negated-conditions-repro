# Yarn: a list of negated `cpu`/`os` values matches every platform

[![CI](https://github.com/marcalexiei/yarn-negated-conditions-repro/actions/workflows/ci.yml/badge.svg)](https://github.com/marcalexiei/yarn-negated-conditions-repro/actions/workflows/ci.yml)

[`sass-embedded-all-unknown`](https://www.npmjs.com/package/sass-embedded-all-unknown) declares:

```json
"cpu": ["!arm", "!arm64", "!riscv64", "!x64"]
```

so it should only install on other CPUs (ppc64, s390x, …). Yarn writes this to `yarn.lock` as:

```yaml
conditions: (!cpu=arm | !cpu=arm64 | !cpu=riscv64 | !cpu=x64)
```

On any single CPU at least one term is true, so Yarn installs the package everywhere. npm skips it.

## Reproduce

On an arm, arm64, riscv64 or x64 machine:

```sh
corepack enable   # Node 25+: npm install -g corepack first
yarn install
yarn run check    # FAIL: installed, but its cpu field excludes this CPU
```

Compare with npm (in a fresh clone):

```sh
npm install
node check.mjs   # OK: not installed
```

## Result (macOS, darwin-arm64, Node 24.22.3)

| Package manager | `sass-embedded-all-unknown`               |
| --------------- | ----------------------------------------- |
| Yarn 4.19.0     | installed, plus 32 dependencies (+15 MiB) |
| npm 11.19.1     | not installed                             |

## CI

[The CI workflow](.github/workflows/ci.yml) runs the same check with Yarn and npm on Linux x64, Linux arm64, macOS arm64 and Windows x64. The Yarn jobs fail and the npm jobs pass.
