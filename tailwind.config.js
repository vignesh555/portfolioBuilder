/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        screens: {
          xs: '375px', // New custom breakpoint
        },
        colors: {
          linksColor: 'blue',
        },
      },
    },
    plugins: [
        function ({ addUtilities }) {
          addUtilities({
            '.debug-tailwind': {
              backgroundColor: '#ff0000',
              color: '#ffffff',
            },
          });
        },
      ],
  }