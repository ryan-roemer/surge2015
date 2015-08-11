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

// Hack in hot loader.
if (process.argv[1].indexOf("webpack-dev-server") !== -1) {
  webpackConfig.module.loaders[0].loaders.unshift("react-hot");
}

module.exports = webpackConfig;
