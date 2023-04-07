const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  webpack: {
    alias: {
      "@": resolve("src"),
    },
    style: {
      sass: {
        loaderOptions: {
          implementation: require("sass"),
          webpackImporter: false,
        },
      },
    },
  },
};
