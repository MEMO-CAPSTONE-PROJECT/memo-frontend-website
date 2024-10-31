import type { Config } from "tailwindcss";
import { BorderRadius } from "./constants/theme/border-radius";
import { Color } from "./constants/theme/color";
import { FontFamily, FontSize, FontWeight } from "./constants/theme/font";
import { LayoutSize } from "./constants/theme/layout-size";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderRadius: BorderRadius,
    fontSize: FontSize,
    fontWeight: FontWeight,
    fontFamily: FontFamily,
    colors: Color,
    extend: {
      spacing: LayoutSize,
    }
  },
  plugins: [],
};
export default config;
