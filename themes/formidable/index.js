import theme from "spectacle/themes/default/index";

const colors = {
  primary: "#FFFFFF",
  secondary: "#232222",
  tertiary: "#5e5c5c",
  // brand colors:
  darkestGray: "#232222",
  darkerGray: "#363434",
  darkGray: "#5e5c5c",
  gray: "#898887",
  lightGray: "#a09e9e",
  lighterGray: "#cfcdcd",
  lightestGray: "#e7e6e5",
  darkRed: "#c23b33",
  red: "#ca5144",
  lightRed: "#d36556",
  lighterRed: "#e89e90",
  lightestRed: "#f3c4ba"
};

const fonts = {
  primary: "'Poppins', 'Futura', 'Century Gothic', 'Trebuchet MS', Helvetica, sans-serif",
  secondary: "'Open Sans', 'Helvetica Neue', Helvetica, sans-serif",
  tertiary: "'Anonymous Pro', Inconsolata, monospace"
};

// Light Blue: 88A0A8 (some headings)
// Dark Blue: 546A76 (em)

// Overrides
// TODO: Have overrides of `colors` and `fonts` to pass in to a function in
// spectacle itself.
theme.colors = colors;
theme.fonts = fonts;
theme.global.body.background = colors.primary;
theme.global.body.color = colors.secondary;
theme.global.body.fontFamily = fonts.secondary;
theme.progress.pacman.pacmanTop.background = colors.tertiary;
theme.progress.pacman.pacmanBottom.background = colors.tertiary;
theme.progress.pacman.point.borderColor = colors.tertiary;
theme.progress.bar.bar.background = colors.tertiary;
theme.progress.number.container.color = colors.tertiary;
theme.components.quote.borderLeft = "1px solid " + colors.primary;
theme.components.quote.color = colors.primary;
theme.components.cite.color = colors.tertiary;
theme.components.code.color = colors.darkGray;
theme.components.code.fontFamily = fonts.tertiary;
theme.components.heading.h1.color = colors.secondary;
theme.components.heading.h1.fontFamily = fonts.primary;
theme.components.heading.h2.color = colors.secondary;
theme.components.heading.h2.fontFamily = fonts.primary;
theme.components.heading.h2.lineHeight = "1.2";
theme.components.heading.h3.fontFamily = fonts.primary;
theme.components.heading.h3.lineHeight = "1.2";
theme.components.heading.h4.fontFamily = fonts.primary;
theme.components.heading.h4.lineHeight = "1.2";
theme.components.heading.h5.fontFamily = fonts.primary;
theme.components.heading.h5.lineHeight = "1.2";
theme.components.heading.h6.fontFamily = fonts.primary;
theme.components.heading.h6.lineHeight = "1.2";
theme.components.link.color = colors.darkGray;
theme.components.list.listStylePosition = "outside";
theme.components.text.fontFamily = fonts.secondary;
theme.components.text.color = colors.darkestGray;
theme.components.text.fontFamily = fonts.secondary;

export default theme;
