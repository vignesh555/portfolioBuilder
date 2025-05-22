/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
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