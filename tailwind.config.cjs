/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        growRight: {
          "0%": { right: "100%", left: 0 },
          "100%": { right: 0, left: 0 },
        },
        shrinkRight: {
          "0%": { left: 0, right: 0 },
          "100%": { left: "100%", right: 0 },
        },
        shrinkLeft: {
          "0%": { left: 0, right: 0 },
          "100%": { left: 0, right: "100%" },
        },
      },
      animation: {
        growRightAnimation:
          "growRight 500ms cubic-bezier(0.4, 0, 0.6, 1) forwards",
        shrinkRightAnimation:
          "shrinkRight 500ms cubic-bezier(0.4, 0, 0.6, 1) forwards",
        shrinkLeftAnimation:
          "shrinkLeft 500ms cubic-bezier(0.4, 0, 0.6, 1) forwards",
      },
    },
  },
  plugins: [],
};
