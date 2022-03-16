const StyleDictionaryPackage = require("style-dictionary");
const { registerConfig } = require("./config");

async function buildTokens({ current, buildPath }) {
  const styleDictionaryExtend = StyleDictionaryPackage.extend(
    registerConfig({ current, buildPath })
  );

  styleDictionaryExtend.buildAllPlatforms();
}

module.exports = {
  buildTokens,
};
