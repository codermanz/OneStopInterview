/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./src/**/*.{js,jsx}", "./public/index.html"],
   theme: {
      extend: {
         colors: {
            "dark-bg": "#151517",
            "theme-blue": "#4D94FF",
         },
      },
   },
   plugins: [],
};
