"use strict";

var path = require("path");
var getConfig = require("hjs-webpack");
var config = require("spectacle/presentation/config");

var webpackConfig = getConfig({
  in: "./index.jsx",
  out: "dist",
  clearBeforeBuild: true,
  html: config.html
});

webpackConfig.devtool = "source-map";

webpackConfig.module.loaders[0] = {
  test: /\.jsx?$/,
  include: [
    path.join(__dirname, "index.jsx"),
    path.join(__dirname, "presentation"),

    // Have to build spectacle as well.
    path.join(__dirname, "node_modules/spectacle/src"),
    path.join(__dirname, "node_modules/spectacle/presentation")
  ],
  loaders: [
    "babel-loader?stage=1"
  ]
};

// Remove hot loader unless _actually_ hot.
if (process.env.WEBPACK_ENV === "hot") {
  webpackConfig.module.loaders[0].loaders.unshift("react-hot");
} else {
  webpackConfig.devServer.hot = false;
}

module.exports = webpackConfig;
