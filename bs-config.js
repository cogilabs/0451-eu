module.exports = {
  proxy: "localhost:3000",
  port: 3001,
  ui: {
      port: 3002
  },
  files: [
      "public/**/*",
      "views/**/*.ejs",
      "src/output.css"
  ],
  ignore: ["node_modules"],
  reloadDelay: 100,
  open: false
};