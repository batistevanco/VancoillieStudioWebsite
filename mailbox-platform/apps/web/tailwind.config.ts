import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        "soft-panel": "0 24px 80px rgba(18, 22, 33, 0.12)",
      },
      keyframes: {
        fadeSlideIn: {
          "0%": {
            opacity: "0",
            filter: "blur(8px)",
            transform: "translateY(16px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateY(0)",
          },
        },
        slideRightIn: {
          "0%": {
            opacity: "0",
            filter: "blur(12px)",
            transform: "translateX(28px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateX(0)",
          },
        },
        testimonialIn: {
          "0%": {
            opacity: "0",
            filter: "blur(8px)",
            transform: "translateY(18px) scale(0.96)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0)",
            transform: "translateY(0) scale(1)",
          },
        },
      },
      animation: {
        "fade-slide-in": "fadeSlideIn 720ms cubic-bezier(.2,.8,.2,1) forwards",
        "slide-right-in": "slideRightIn 900ms cubic-bezier(.2,.8,.2,1) forwards",
        "testimonial-in": "testimonialIn 720ms cubic-bezier(.2,.8,.2,1) forwards",
      },
    },
  },
  plugins: [],
};

export default config;
