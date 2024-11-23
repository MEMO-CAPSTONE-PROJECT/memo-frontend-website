import { createRequire } from "module";
import type { Config } from "tailwindcss";
import { BorderRadius } from "./constants/theme/border-radius";
import { BorderWidth } from "./constants/theme/border-width";
import { Color } from "./constants/theme/color";
import { FontSize, FontWeight } from "./constants/theme/font";
import { LayoutSize } from "./constants/theme/layout-size";

const require = createRequire(import.meta.url);

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./shared/variants/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    borderWidth: BorderWidth,
    borderRadius: BorderRadius,
    fontSize: FontSize,
    fontWeight: FontWeight,
    fontFamily: { kanit: ["var(--font-kanit)"] },
    colors: Color,
    extend: {
      spacing: LayoutSize,
    }
  },
  plugins: [
    require('daisyui'), 
    require("tailwindcss-inner-border"),
  ],
  daisyui: {
    themes: false,
  },
};
export default config;
