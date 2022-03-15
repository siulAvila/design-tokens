const StyleDictionaryPackage = require("style-dictionary");
const { registerConfig } = require("./config");

async function buildTokens({ current, buildPath }) {
  const styleDictionaryextend = StyleDictionaryPackage.extend(
    registerConfig({ current, buildPath })
  );

  styleDictionaryextend.buildAllPlatforms();
}

module.exports = {
  buildTokens,
};
