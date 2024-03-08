* 3/8/24 Is there a new "App Icon" in iOS submissions?
* Figure out how to pre-populate the Team, Display Name, Version and Build in the plist for ios
* Figure out how to pre-populate the 'App Uses Non-Exempt Encryption' to 'NO'

* Instead of copying and removing React.lazy, try using:
  * new webpack.optimize.LimitChunkCountPlugin({maxChunks: 1})
  * NormalModuleReplacementPlugin to replace it with a dummy function
  * https://github.com/webpack-contrib/bundle-loader/issues/22


stevepodell@StevesM1Dec2021 Pixel_4_XL_API_33.avd % rm ~/.android/avd/Pixel_4_XL_API_33.avd/*.lock
