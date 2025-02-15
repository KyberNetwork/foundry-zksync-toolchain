const os = require("os");

function normalizeVersionName(version) {
  if (/^nightly-[0-9a-f]{40}$/.test(version)) {
    return "nightly";
  }
  return version.replace(/-/g, "_");
}

function mapArch(arch) {
  const mappings = {
    x32: "386",
    x64: "amd64",
  };

  return mappings[arch] || arch;
}

function getDownloadObject(version) {
  const platform = os.platform();
  let filename;

  if (version.startsWith("foundry")) {
    // If version starts with "foundry", don't add the prefix.
    filename = `${normalizeVersionName(version)}_${platform}_${mapArch(os.arch())}`;
  } else {
    // Otherwise, add the "foundry_zksync_" prefix.
    filename = `foundry_zksync_${normalizeVersionName(version)}_${platform}_${mapArch(os.arch())}`;
  }

  const extension = platform === "win32" ? "zip" : "tar.gz";
  const url = `https://github.com/matter-labs/foundry-zksync/releases/download/${version}/${filename}.${extension}`;

  return {
    url,
    binPath: ".",
  };
}

module.exports = {
  getDownloadObject,
};
