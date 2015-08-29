import theme from "spectacle/themes/default/index";

const colors = {
  primary: "white",
  secondary: "black",
  tertiary: "#d71920" // Lighter: "rgb(229, 44, 63)"
};

// Light Blue: 88A0A8
// Dark Blue: 546A76

// Overrides
// TODO: Have overrides of `colors` and `fonts` to pass in to a function in
// spectacle itself.
theme.colors = colors;
theme.global.body.background = colors.primary;
theme.global.body.color = colors.secondary;
theme.progress.pacman.pacmanTop.background = colors.tertiary;
theme.progress.pacman.pacmanBottom.background = colors.tertiary;
theme.progress.pacman.point.borderColor = colors.tertiary;
theme.progress.bar.bar.background = colors.tertiary;
theme.progress.number.container.color = colors.tertiary;
theme.components.quote.borderLeft = "1px solid " + colors.primary;
theme.components.quote.color = colors.primary;
theme.components.cite.color = colors.tertiary;
theme.components.heading.h1.color = colors.tertiary;
theme.components.heading.h2.color = colors.secondary;

export default theme;

