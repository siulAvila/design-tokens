const StyleDictionaryPackage = require("style-dictionary");

function registerConfig({ current, buildPath }) {
  return {
    source: [current.source],
    platforms: {
      "web/css": {
        transformGroup: "css",
        buildPath: buildPath.css,
        files: [
          {
            filter: "isNotObject",
            destination: `${current.filename}.css`,
            format: "css/variables",
          },
        ],
      },
      scss: {
        transformGroup: "scss",
        buildPath: buildPath.scss,
        files: [
          {
            filter: "isNotObject",
            destination: `${current.filename}.scss`,
            format: "scss/variables",
          },
          {
            filter: "isObject",
            destination: "mixins.scss",
            format: "scss/mixins",
          },
        ],
      },
    },
  };
}

StyleDictionaryPackage.registerFilter({
  name: "isObject",
  matcher: function (token) {
    return typeof token.value === "object";
  },
});

StyleDictionaryPackage.registerFilter({
  name: "isNotObject",
  matcher: function (token) {
    return typeof token.value !== "object";
  },
});

StyleDictionaryPackage.registerFormat({
  name: "scss/mixins",
  formatter: function ({ dictionary }) {
    let output = "";
    dictionary.allProperties.map((prop) => {
      if (prop.attributes.category == "switch") {
        output += `
						@if $type == switch-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
						}
					`;
      }
      if (prop.attributes.category == "spin") {
        output += `
						@if $type == spin-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
							#{$trigger} {
								transform: rotate(${prop.value.rotation});
							}
						}
					`;
      }
      if (prop.attributes.category == "expand") {
        output += `
						@if $type == expand-${prop.attributes.type} {
							transition-duration: ${prop.value.velocity};
							transition-timing-function: ${prop.value.vibe};
							#{$trigger} {
								transform: scale(${prop.value.scale});
							}
						}
					`;
      }
    });
    return `
      @mixin motion-token($type, $trigger){
        ${output}
      }
            `;
  },
});

module.exports = {
  registerConfig,
};
