const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    library: {
      type: 'umd',
      name: 'FrontOrm',
      umdNamedDefine: true,
    }
  },
  mode: 'production'
};
