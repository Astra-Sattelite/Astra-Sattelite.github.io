module.exports = {
  plugins: [
    require("postcss-nested"),
    require("postcss-d-ts"),
    require("postcss-pxtorem"),
    require("autoprefixer"),
    require("cssnano")
  ]
}