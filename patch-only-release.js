// see https://github.com/microsoft/vcpkg/issues/21360

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

async function main() {
  const vcpkgExe = child_process.execSync("where vcpkg").toString("utf8");
  const vcpkgRoot = path.parse(vcpkgExe).dir;

  console.log("vcpkgExe ", vcpkgExe);
  console.log("vcpkgRoot ", vcpkgRoot);

  const tripletsRoot = path.join(vcpkgRoot, "triplets");
  const x64_release = path.join(tripletsRoot, "x64-windows-rel.cmake");
  fs.copyFileSync(path.join(tripletsRoot, "x64-windows.cmake"), x64_release);

  fs.appendFileSync(x64_release, "\nset(VCPKG_BUILD_TYPE release)\n");
}

main();
