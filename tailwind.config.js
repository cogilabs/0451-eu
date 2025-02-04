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
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

