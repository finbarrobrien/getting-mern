const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: 'templates/index.html.template',
    inject: 'body',
  }),
];

const prod = process.env.NODE_ENV === 'production';

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }));
}

const config = {
    // Where webpack looks to begin building JS bundles
  entry: {
    app: [ // polyfill functions available throughout our app as it is first here
      'babel-polyfill',
      './client/index.js',
    ],
  },
    // Output bundles webpack generates
  output: {
    path: path.resolve(__dirname, './build'), // specifies where output bundle is stored
    filename: '[name]-[hash]-bundle.js', // output filename for bundle, interpolation done on name, hash, checksum
    publicPath: 'build',

  },
    // specify to create source map
  //devtool: 'source-map',
    // Configures the loaders we need for static assets
  module: {
    loaders: [
      {
        loader: 'babel-loader', // refers to babel-loader
        test: /\.js$/,
        include: [
          path.resolve(process.cwd(), 'client/')
        ],
        options: {
          presets: ['es2015', 'react', 'stage-0'],
        },
      }],
  },
    // how require statements are treated in client side code
  resolve: {
    extensions: ['.js'], // file extensions to consider for bundling
    modules: ['node_modules'], // where modules can be found
  },
  plugins,
};

module.exports = config;
