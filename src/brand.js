const { readdirSync } = require("fs");
const path = require("path");

function getBrands() {
  const brands = [
    {
      source: path.resolve("tokens", "globals", "**", "*.json"),
      dest: "",
      filename: "globals",
      brand: "",
      theme: "",
      mode: "",
    },
    {
      source: path.resolve("tokens", "motions", "**", "*.json"),
      dest: "",
      filename: "motions",
      brand: "",
      theme: "",
      mode: "",
    },
  ];

  getDirectories(path.resolve("tokens", "brands")).map((brand) =>
    getDirectories(path.resolve("tokens", "brands", brand)).map((theme) =>
      getDirectories(path.resolve("tokens", "brands", brand, theme)).map(
        (mode) =>
          brands.push({
            source: path.resolve(
              "tokens",
              "brands",
              brand,
              theme,
              mode,
              "**",
              "*.json"
            ),
            dest: path.join(brand, theme),
            filename: mode,
            brand,
            theme,
            mode,
          })
      )
    )
  );
  return brands;
}

function getDirectories(dirPath) {
  return readdirSync(path.resolve(dirPath)).map((folder) => folder);
}

module.exports = {
  getBrands,
};
