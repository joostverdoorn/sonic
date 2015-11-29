module.exports = {
  entry: __dirname + '/dist/sonic.js',
  devtool: 'source-map',
  cache: true,
  debug: true,
  output: {
    path: __dirname + '/dist',
    filename: 'sonic.browser.js',
    library: 'Sonic',
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
