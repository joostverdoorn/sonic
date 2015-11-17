var glob = require('glob');

module.exports = {
  target: 'node',

  node: {
    fs: 'empty'
  },

  entry: glob.sync(__dirname + '/test/*.js'),
  cache: true,
  debug: true,

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
        loader: 'babel?presets[]=es2015&plugins[]=transform-async-to-generator&plugins[]=transform-runtime'
      }
    ]
  }
};
