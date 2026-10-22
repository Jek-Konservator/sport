import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "orange",
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: "lg",
  fontFamily: "var(--font-main), system-ui, -apple-system, sans-serif",
  headings: {
    fontFamily: "var(--font-main), system-ui, -apple-system, sans-serif",
    fontWeight: "800",
  },
  defaultGradient: { from: "orange.6", to: "pink.6", deg: 135 },
  cursorType: "pointer",
});
