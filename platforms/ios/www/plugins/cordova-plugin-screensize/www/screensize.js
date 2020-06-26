cordova.define("cordova-plugin-screensize.screensize", function(require, exports, module) {
/* globals cordova, module */

module.exports = {
  get: function (successCallback, errorCallback) {
    cordova.exec(successCallback, errorCallback, 'ScreenSize', 'get', []);
  }
};

});
