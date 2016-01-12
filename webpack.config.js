module.exports = {
  entry: "./public/main.js",
  output: {
    path: __dirname + '/public/build/',
    publicPath: '/build/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"},
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        // edit this for additional asset file types
        test: /\.(png|jpg|gif)$/,
        loader: 'url',
        query: {
          // inline files smaller then 10kb as base64 dataURL
          limit: 10000,
          // fallback to file-loader with this naming scheme
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/ws/*': {
        target: 'ws://localhost:3000',
        ws: true
      },
      '/api.js': {
        target: 'http://localhost:3000'
      },
      '*/icon.png': {
        target: 'http://localhost:3000'
      },
      '*/logo.png': {
        target: 'http://localhost:3000'
      }
    }
  }
}
;
