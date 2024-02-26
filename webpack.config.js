const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");
const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");

const paths = {
  src: {
    js: "./src/js/",
    scripts: "./src/js/scripts",
    scss: "./src/scss",
    img: "./src/images",
    video: "./src/video",
    public: "./src/public",
  },
  dist: {
    js: "./public/assets/js",
    scripts: "./public/assets/js/scripts",
    css: "./public/assets/css",
    img: "./public/assets/images",
    video: "./public/assets/video",
    public: "./public",
    private: "./private",
  },
};

module.exports = {
  performance: {
    hints: false,
  },
  entry: {
    libs: paths.src.scss + "/libs.scss",
    index: [paths.src.js + "/index.js", paths.src.scss + "/index.scss"],
  },
  output: {
    filename: paths.dist.js + "/[name].bundle.js",
  },
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["autoprefixer"]],
              },
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "/public/assets/fonts",
            publicPath: "/assets/fonts",
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/](node_modules)[\\/].+\.js$/,
          name: "vendor",
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: paths.src.img, to: paths.dist.img },
        //{ from: paths.src.video, to: paths.dist.video },
        { from: paths.src.public, to: paths.dist.public },
      ],
    }),
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: paths.dist.css + "/[name].bundle.css",
    }),
  ],
};
