import type { Config } from "tailwindcss";

import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        vibe: {
          "0%": {
            transform: "translate(0)",
          },
          "20%": {
            transform: "translate(-0.25rem)",
          },
          "40%": {
            transform: "translate(0.25rem)",
          },
          "60%": {
            transform: "translate(-0.125rem)",
          },
          "80%": {
            transform: "translate(0.125rem)",
          },
          "100%": {
            transform: "translate(0)",
          },
        },
        ["fade-in-left"]: {
          "0%": {
            transform: "translateX(2rem)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        ["fade-in-right"]: {
          "0%": {
            transform: "translateX(-2rem)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        ["fade-in-top"]: {
          "0%": {
            transform: "translateY(2rem)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        ["fade-in-bottom"]: {
          "0%": {
            transform: "translateY(-2rem)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        ["fade-out-left"]: {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(-2rem)",
            opacity: "0",
          },
        },
        ["fade-out-right"]: {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(2rem)",
            opacity: "0",
          },
        },
        ["fade-out-top"]: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-2rem)",
            opacity: "0",
          },
        },
        ["fade-out-bottom"]: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(2rem)",
            opacity: "0",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        vibe: "vibe 1s ease-in-out infinite",
        ["fade-in-left"]: "fade-in-left 1s ease-in-out infinite",
        ["fade-in-right"]: "fade-in-right 1s ease-in-out infinite",
        ["fade-in-top"]: "fade-in-top 1s ease-in-out infinite",
        ["fade-in-bottom"]: "fade-in-bottom 1s ease-in-out infinite",
        ["fade-out-left"]: "fade-out-left 1s ease-in-out infinite",
        ["fade-out-right"]: "fade-out-right 1s ease-in-out infinite",
        ["fade-out-top"]: "fade-out-top 1s ease-in-out infinite",
        ["fade-out-bottom"]: "fade-out-bottom 1s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [animate],
} satisfies Config;
