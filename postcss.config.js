module.exports = {
  plugins: [
    require("precss"),
    require("postcss-d-ts"),
    require("postcss-pxtorem"),
    require("autoprefixer"),
    require("cssnano")
  ]
}