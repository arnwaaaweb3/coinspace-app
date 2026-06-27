/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'coin-purple': '#604cc3',
        'coin-orange': '#ff7f3e',
        'coin-cream': '#fef4ea',
      },
    },
  },
  plugins: [],
}