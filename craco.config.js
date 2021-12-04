const CracoAlias = require('craco-alias')
const CracoLessPlugin = require("craco-less-plugin");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: './',
        aliases: {
          "@consts": "./src/constants",
          "@state": "./src/redux",
          "@utils": "./src/utils",
          "@comps": "./src/wrappers",
          "@mods": "./src/modules",
          "@assets": "./src/assets",
        }
      }
    },
    {
      plugin: CracoLessPlugin,
      options: {
        modifyVars: {
          hack: `true;@import "${require.resolve(
            "./src/assets/less/yoda-theme.less"
          )}";`,
        },
        javascriptEnabled: true,
      },
    },
  ],
};
