/* tslint:disable */
require('dotenv').config({ path: '../.env'});

import * as autoprefixer from 'autoprefixer';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


// if the application is being served through express.js &
// server side rendering, place in dist folder. If it is being
// served through Django, place it in the api app/static folder
let outputPath = '../dist';
if (process.env.SERVER.toUpperCase() === 'DJANGO') {
  outputPath = '../../api/static/api';
}

const configuration: webpack.Configuration = {
  devtool: 'source-map',
  entry: [
    './src/index.tsx',
  ],
  output: {
    filename: 'bundle.min.js',
    path: path.join(__dirname, outputPath),
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new ExtractTextPlugin({
      allChunks: true,
      filename: '/bundle.min.css',
    }),
    new webpack.optimize.UglifyJsPlugin({
    }),
    new webpack.LoaderOptionsPlugin({ options: { postcss: [ autoprefixer ] } }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new BundleAnalyzerPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          publicPath: '/dist',
        }),
        include: path.join(__dirname, '../src/sass'),
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        use: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.ts$|\.tsx$/,
        use: ['awesome-typescript-loader'],
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.json$/,
        use: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.ts', '.tsx', '.json'],
  },
};

export default configuration;
