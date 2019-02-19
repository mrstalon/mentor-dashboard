const path = require('path')

const webpack = require('webpack')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: ['./client/client.js'],
  output: {
    path: path.resolve(__dirname, './client-dist'),
    publicPath: '/',
    filename: 'static/bundle-[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader', 
          'css-loader', 
          'sass-loader' 
        ]
      },
      {
        test: /\.(svg|ico|jpg|png|jpe?g|gif)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/img/'
          }
        }
      }
    ]
  },
  devServer: {
    noInfo: true,
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'client-dist'),
    proxy: {
      '/api/*': 'http://localhost:5000',
      '/auth/*': 'http://localhost:5000'
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, 'client'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      filename: 'index.html',
      template: 'client/index.html'
    }),
    new CleanWebpackPlugin(['client-dist'])
  ]
}

if (process.env.NODE_ENV === 'development') {
  module.exports.devtool = 'eval-source-map'
  console.log('server is listening on default port (8080)')
}

if (process.env.NODE_ENV !== 'development') {
  module.exports.devtool = 'source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.OccurrenceOrderPlugin()
  ])
}
