const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.ts'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
    library: {
      type: 'umd',
      name: 'FrontOrm',
      umdNamedDefine: true,
    }
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  mode: 'production',
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              query: {
                declaration: false,
              }
            },
          }
        ]
      }
    ]
  }
};
