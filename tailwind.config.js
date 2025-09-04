/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
      extend: {
        colors: {
          brand: {
            900: '#0B3A4A',
            600: '#0E7195',
            500: '#1396BF',
            300: '#4CC3E0',
          },
        },
      },
    },
    plugins: [],
  };
  