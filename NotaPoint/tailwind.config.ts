export default {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(0 0% 88%)",
        input: "hsl(0 0% 88%)",
        ring: "#00704B",
        background: "#FAFAFA",
        foreground: "hsl(0 0% 10%)",
        primary: {
          DEFAULT: "#00704B",
          foreground: "#FFFFFF",
          glow: "#109367",
        },
        secondary: {
          DEFAULT: "hsl(150 45% 90%)",
          foreground: "hsl(160 100% 18%)",
        },
        destructive: {
          DEFAULT: "hsl(0 84% 60%)",
          foreground: "hsl(0 0% 100%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 94%)",
          foreground: "hsl(0 0% 45%)",
        },
        accent: {
          DEFAULT: "hsl(50 75% 55%)",
          foreground: "hsl(0 0% 10%)",
          soft: "hsl(50 60% 94%)",
        },
        success: {
          DEFAULT: "hsl(160 80% 40%)",
          foreground: "hsl(0 0% 100%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(0 0% 10%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 100%)",
          foreground: "hsl(0 0% 10%)",
        },
        sidebar: {
          DEFAULT: "hsl(0 0% 98%)",
          foreground: "hsl(0 0% 10%)",
          primary: "#00704B",
          "primary-foreground": "#FFFFFF",
          accent: "hsl(150 45% 90%)",
          "accent-foreground": "hsl(160 100% 18%)",
          border: "hsl(0 0% 88%)",
          ring: "hsl(160 100% 22%)",
        },
      },
      borderRadius: {
        lg: "16px",
        md: "14px",
        sm: "12px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
    },
  },
  plugins: [],
};
