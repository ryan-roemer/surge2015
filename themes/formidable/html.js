/*eslint-disable max-len, indent*/
module.exports = function (data) {

  const html = [
    "<!doctype html>",
      "<html>",
        "<head>",
          "<meta charset=\"utf-8\"/>",
          "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\"/>",
          // TODO(9): Re-enable google fonts.
          // https://github.com/ryan-roemer/surge2015/issues/9
          // "<link href=\"http://fonts.googleapis.com/css?family=Open+Sans:400,700\" rel=\"stylesheet\" type=\"text/css\">",
          // "<link href=\"https://fonts.googleapis.com/css?family=Poppins:400,600\" rel=\"stylesheet\" type=\"text/css\">",
          ((data.css && /\.css$/.test(data.css)) ? "<link href=\"" + data.css + "\" rel=\"stylesheet\" type=\"text/css\" />" : ""),
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
