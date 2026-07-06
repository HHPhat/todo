/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed": "#1a1c1c",
        "on-error-container": "#93000a",
        "on-secondary-fixed-variant": "#454747",
        "on-background": "#1b1c1c",
        "tertiary-fixed": "#e2e2e2",
        "secondary": "#5d5f5f",
        "secondary-container": "#dfe0e0",
        "on-tertiary": "#ffffff",
        "surface": "#fbf9f8",
        "primary-container": "#c92127",
        "on-tertiary-fixed-variant": "#454747",
        "on-surface": "#1b1c1c",
        "inverse-surface": "#303030",
        "on-tertiary-fixed": "#1a1c1c",
        "on-error": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "inverse-primary": "#ffb3ad",
        "surface-container-low": "#f6f3f2",
        "on-secondary-container": "#616363",
        "tertiary-container": "#666868",
        "tertiary-fixed-dim": "#c6c6c7",
        "outline": "#906f6c",
        "on-secondary": "#ffffff",
        "on-primary-fixed": "#410003",
        "surface-tint": "#bc141f",
        "outline-variant": "#e4bdba",
        "surface-bright": "#fbf9f8",
        "error-container": "#ffdad6",
        "on-primary": "#ffffff",
        "on-tertiary-container": "#e7e7e7",
        "secondary-fixed-dim": "#c6c6c7",
        "secondary-fixed": "#e2e2e2",
        "surface-container-highest": "#e4e2e1",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae8e7",
        "error": "#ba1a1a",
        "surface-variant": "#e4e2e1",
        "primary-fixed": "#ffdad6",
        "on-primary-fixed-variant": "#930011",
        "inverse-on-surface": "#f3f0f0",
        "tertiary": "#4e5050",
        "primary": "#a30014",
        "on-surface-variant": "#5c403d",
        "primary-fixed-dim": "#ffb3ad",
        "background": "#fbf9f8",
        "surface-dim": "#dcd9d9",
        "on-primary-container": "#ffe0dd"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "stack-md": "16px",
        "gutter": "16px",
        "margin-x": "24px",
        "stack-lg": "32px",
        "container-max": "1200px",
        "stack-sm": "8px"
      },
      fontFamily: {
        "headline-lg": ["Be Vietnam Pro", "sans-serif"],
        "headline-md": ["Be Vietnam Pro", "sans-serif"],
        "label-bold": ["Be Vietnam Pro", "sans-serif"],
        "body-md": ["Be Vietnam Pro", "sans-serif"],
        "price-lg": ["Be Vietnam Pro", "sans-serif"],
        "body-lg": ["Be Vietnam Pro", "sans-serif"],
        "body-sm": ["Be Vietnam Pro", "sans-serif"]
      },
      fontSize: {
        "headline-lg": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "label-bold": ["13px", { lineHeight: "18px", letterSpacing: "0.02em", fontWeight: "700" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "price-lg": ["18px", { lineHeight: "24px", fontWeight: "700" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }]
      }
    }
  },
}