import print from "spectacle/themes/default/print";

const colors = {
  primary: "#000000",
  secondary: "#000000",
  tertiary: "#000000",
  darkestGray: "#000000",
  darkerGray: "#000000",
  darkGray: "#000000",
  gray: "#000000",
  lightGray: "#000000",
  lighterGray: "#000000",
  lightestGray: "#000000",
  darkRed: "#c23b33",
  red: "#ca5144",
  lightRed: "#000000",
  lighterRed: "#000000",
  lightestRed: "#000000"
};

const fonts = {
  primary: "'Poppins', 'Futura', 'Century Gothic', 'Trebuchet MS', Helvetica, sans-serif",
  secondary: "'Open Sans', 'Helvetica Neue', Helvetica, sans-serif",
  tertiary: "'Anonymous Pro', Inconsolata, monospace"
};

print.colors = colors;
print.fonts = fonts;
print.global.body.fontFamily = fonts.primary;
print.global.body.color = colors.primary;

export default print;
