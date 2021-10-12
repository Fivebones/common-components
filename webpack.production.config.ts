import path from "path";
import { Configuration, HotModuleReplacementPlugin, optimize } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CaseSensitivePathsWebpackPlugin from "case-sensitive-paths-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const jsonImporter = require("node-sass-json-importer");

const globalStylesRegex = /\.(sass|scss|css)$/i;
const localStylesRegex = /\.module\.(sass|scss|css)$/i;

const config: Configuration = {
  mode: "production",
  entry: path.resolve(__dirname, "./src/index.js"),
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: globalStylesRegex,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              modules: {
                auto: localStylesRegex,
                localIdentName: "[hash:base64:6]",
              },
            },
          },
          "postcss-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                // adds the ability to import JSON files in to SASS/SCSS variables
                // currently used with `css-vars.json` for importing colour variables to SASS
                importer: jsonImporter(),
              },
            },
          },
        ],
        sideEffects: true,
      },
      {
        test: /\.gif/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            mimetype: "image/gif",
          },
        },
      },
      {
        test: /\.jpg/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            mimetype: "image/jpg",
          },
        },
      },
      {
        test: /\.png/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "file-loader",
          options: {
            limit: 10000,
            mimetype: "image/png",
            name: "[name].[ext]",
          },
        },
      },
      // treats dependencies with type: "module" the same as js files
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    libraryTarget: "umd",
    libraryExport: "default",
    library: "validere-common",
  },
  externals: {
    // Use external version of React
    react: {
      commonjs: "react",
      commonjs2: "react",
      amd: "react",
      root: "React",
    },
    "react-dom": {
      commonjs: "react-dom",
      commonjs2: "react-dom",
      amd: "react-dom",
      root: "ReactDOM",
    },
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new CaseSensitivePathsWebpackPlugin(),
    new CleanWebpackPlugin(),
    new optimize.AggressiveMergingPlugin(), //Merge chunks
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    static: {
      directory: "./dist",
    },
    hot: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};

export default config;
