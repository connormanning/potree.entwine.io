const path = require('path')
module.exports = {
    mode: 'production',
    entry: path.join(__dirname, 'index.js'),
    output: { filename: 'bundle.js' },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
}

