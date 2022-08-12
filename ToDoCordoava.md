* Instead of copying and removing React.lazy, try using:
  * new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
  * NormalModuleReplacementPlugin to replace it with a dummy function
  * https://github.com/webpack-contrib/bundle-loader/issues/22
