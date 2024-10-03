/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./frontend/**/*.{vue,js,ts,jsx,tsx}", // Add this line if your Vue files are in the frontend directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
