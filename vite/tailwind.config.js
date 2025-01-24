/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../contents/assets/**/*.html",
    "../contents/**/*.py",
    "../*.py",
    "./*.js",
  ],
  theme: {
    fontFamily: {
      jetbrains: ["JetBrains Mono", "serif"]
    }
  }
};
