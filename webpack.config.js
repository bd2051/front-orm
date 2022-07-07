const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'dev/main.js'),
  output: {
    filename: 'main.js',
    path: path.join(__dirname, 'dist'),
  },
  mode: "development",
  devServer: {
    static: {
      directory: path.join(__dirname, 'dev'),
    },
    compress: true,
    port: 3000,
  }
};
