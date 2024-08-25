/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: ["tailwindcss"],
  theme: {
    extend: {
      colors: {
        bodyColor: "#18181b",
        yellow: "#fff9d0",
        headerColor: "#28272c",
        blue: "#3081f8",
        blueHover: "#3068bb",
        pColor: "#777",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  plugins: [],
};
