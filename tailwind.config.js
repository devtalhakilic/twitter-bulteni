/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        "pulse-slow": "pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.7 },
        },
      },
    },
  },
  plugins: [],
};
