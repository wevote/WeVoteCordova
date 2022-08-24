* Instead of copying and removing React.lazy, try using:
  * new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
  * NormalModuleReplacementPlugin to replace it with a dummy function
  * https://github.com/webpack-contrib/bundle-loader/issues/22


stevepodell@StevesM1Dec2021 Pixel_4_XL_API_33.avd % rm ~/.android/avd/Pixel_4_XL_API_33.avd/*.lock
