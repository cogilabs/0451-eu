const { tags } = require('./config/tags');

// Generate safelist from tags
const tagSafelist = Object.values(tags).flatMap(tag => [
  `bg-${tag.color}`,
  `border-${tag.color}`,
  `bg-${tag.color}/40`  // for bg-opacity-40
]);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './views/**/*.ejs',
    './public/**/*.html',
    // ...other paths
  ],
  safelist: tagSafelist,
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'fade-out': 'fadeOut 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.95)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

