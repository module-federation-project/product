const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 3001,
    hot: true,
    historyApiFallback: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "product",
      filename: "remoteEntry.js",
      // kendini expose edicek: key= diger uygulamalarin bu componente hangi isimle erisebilecegi
      // bir uygulamanin tum sayfasini veya belli bir componentini expose edebilirsin
      exposes: {
        "./App": "./src/App",
      },
      remotes: { shell: "shell@http://localhost:3000/remoteEntry.js" },
      shared: {
        ...deps,
        react: {
          singleton: true, // bu sayede tum uygulamalar tek bir react instance i uzerinden calisir
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "@mui/material": {
          singleton: true,
          requiredVersion: deps["@mui/material"],
        },
        "@mui/icons-material": {
          singleton: true,
          requiredVersion: deps["@mui/icons-material"],
        },
      },
    }),
  ],
};
