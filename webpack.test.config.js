var glob = require('glob');

module.exports = {
  target: 'node',

  node: {
    fs: 'empty'
  },

  entry: glob.sync(__dirname + '/test/*.js'),
  cache: true,
  debug: true,
  devtool: 'source-map',

  output: {
    path: __dirname + '/build',
    filename: 'test.js',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      }
    ]
  }
};
