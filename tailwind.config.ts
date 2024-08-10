import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#0045C7",
        primaryDark: "#0026AA"
       },
       backgroundImage:{
        gbg: `linear-gradient(320deg,#0045C7,#0026AA)`
       }
    },
  },
  plugins: [],
};
export default config;
