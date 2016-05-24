var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');

var projectName = 'site';

var VENDOR_DEPENDENCIES = [
  'classnames',
  'lodash',
  'material-ui',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'react-router-redux',
  'react-tap-event-plugin',
  'redux',
  'redux-thunk',
  'reselect',
  'rsvp',
  'webcomponents.js/MutationObserver'
];

var NODE_ENV = process.env.NODE_ENV;
var env = {
  production: NODE_ENV === 'production',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};
env.build = env.production || env.staging;

var mainCss = new ExtractTextPlugin(projectName + '.css');

var config = {
  entry: {
    main: path.join(__dirname, '../app/main.jsx'),
    vendor: VENDOR_DEPENDENCIES
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: projectName + '.js',
    publicPath: '/'
  },

  resolve: {
    root: path.join(__dirname, ''),
    modulesDirectories: [
      'node_modules',
      'app'
    ],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.' + projectName + '.js'),
    mainCss
  ],

  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        include: path.join(__dirname, '../app'),
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '../styles'),
        loader: mainCss.extract(['css-loader', 'postcss-loader', 'sass-loader'])
      }
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 2 versions', 'ie >= 9'] }) ]
};

config.resolve.alias = {};
config.resolve.alias[projectName] = path.resolve(__dirname, '../app');
module.exports = config;
