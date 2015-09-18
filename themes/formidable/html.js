/*eslint-disable max-len, indent*/
module.exports = function (data) {

  // **HACK**: `hjs-webpack` gets all messed up with this stuff. Infer `.css` if have .`js`
  // https://github.com/ryan-roemer/surge2015/issues/19
  const css = (data.main && data.isDev === false) ?
    data.main.replace(/\.js$/, ".css") :
    null;

  const html = [
    "<!doctype html>",
      "<html>",
        "<head>",
          "<meta charset=\"utf-8\"/>",
          "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\"/>",
          "<link href=\"http://fonts.googleapis.com/css?family=Open+Sans:400,700\" rel=\"stylesheet\" type=\"text/css\">",
          "<link href=\"https://fonts.googleapis.com/css?family=Poppins:400,600\" rel=\"stylesheet\" type=\"text/css\">",
          ((css && /\.css$/.test(css)) ? "<link href=\"" + css + "\" rel=\"stylesheet\" type=\"text/css\" />" : ""),
          "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css\">",
        "</head>",
        "<body>",
          "<div id=\"root\"></div>",
          (data.main ? "<script src=\"" + data.main + "\"></script>" : ""),
        "</body>",
      "</html>"
  ].join("");

  return {
    "200.html": html,
    "index.html": html
  };
};
