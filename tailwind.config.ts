import { type Config } from "tailwindcss";

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['background-clip'],
      backgroundImage: ['background-clip'],
    },
  },
  plugins: [],
} satisfies Config;