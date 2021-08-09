const HtmlWebpackPlugin = require("html-webpack-plugin")
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")

const settings = require("./buildSettings/index.js");

module.exports = {
  context: __dirname,
  entry: settings.clientEntryPath,
  target: "web",
  devtool: "inline-source-map",
  resolve: {
    extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"]
      // },
      {
        test: /\.(jpg|JPG|jpeg|png|PNG|gif|mp3|svg|ttf|woff2|woff|eot)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: settings.assetsPath,
            publicPath: (path) => settings.assetsPath + "/" + path
          }
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        options: {
          fix: true
        },
        files: ["./src/**/*.{ts,tsx}"] // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      }
    }),
     // creates the index.html entry point and injects the app-bundle into it via a script tag
    new HtmlWebpackPlugin({
      title: "GitHub Repositories",
      template: settings.htmlPath
    }),
  ]
}
