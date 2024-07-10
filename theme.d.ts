// theme.d.ts
import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary?: PaletteColor;
  }
  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
}
