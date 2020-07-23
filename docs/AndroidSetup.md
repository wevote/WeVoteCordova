# Install Steps for Android


1. Add a couple of lines to a resource file, that should have been updated by the install of the facebook plugin.

    Until https://github.com/jeduan/cordova-plugin-facebook4/issues/599 is resolved...
    
    Edit `/Users/your-username/MyProjects/WeVoteCordova/platforms/android/app/src/main/res/values/strings.xml`
    
    ```
    <?xml version='1.0' encoding='utf-8'?>
    <resources>
        <string name="app_name">We Vote</string>
        <string name="launcher_name">@string/app_name</string>
        <string name="activity_name">@string/launcher_name</string>
        <string name="fb_app_id">1097389196952441</string>
        <string name="fb_app_name">WeVoteWebApp</string>
    </resources>
    ```
        
    Add those last two lines "fb_app_id" and "fb_app_name".

1. cd to the Android specific code area, and the platform_www directory.
    This is the area Android serves the bundle.js in some situations from `WeVoteCordova/platforms/android/platform_www`
    ```
    cd /Users/your-username/MyProjects/WeVoteCordova/platforms/android/platform_www
    ```

1. bundle.js (This file probably will not yet exist in this location)
    ```
    rm bundle.js
    ln -s /Users/your-username/MyProjects/WebApp/build/js/bundle.js bundle.js
    ```

1.  Make the other symlinks that the Android Cordova app will need while running (including another bundle.js)
    ```
    cd /Users/your-username/MyProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    rm index.html
    ln -s /Users/your-username/MyProjects/WeVoteCordova/www/index.html index.html
    ln -s /Users/your-username/MyProjects/WebApp/build/css css
    ln -s /Users/your-username/MyProjects/WebApp/build/fonts fonts
    ln -s /Users/your-username/MyProjects/WebApp/build/img img
    ln -s /Users/your-username/MyProjects/WebApp/build/javascript javascript

    ```
    When you are done, the Android www directory should look like this
    ```
    (WebAppEnv)Steves-iMac:www your-username$ pwd
    /Users/your-username/MyProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    (WebAppEnv)Steves-iMac:www your-username$ ls -la
    total 152
    drwxr-xr-x  12 your-username  staff    384 Apr 12 16:53 .
    drwxr-xr-x   3 your-username  staff     96 Apr 12 16:34 ..
    lrwxr-xr-x   1 your-username  staff     73 Apr 12 16:53 bundle.js -> /Users/your-username/MyProjects/WebApp/build/js/bundle.js
    drwxr-xr-x   6 your-username  staff    192 Apr 12 16:34 cordova-js-src
    -rw-r--r--   1 your-username  staff  73155 Apr 12 16:34 cordova.js
    -rw-r--r--   1 your-username  staff   1845 Apr 12 16:34 cordova_plugins.js
    lrwxr-xr-x   1 your-username  staff     64 Apr 12 16:52 css -> /Users/your-username/MyProjects/WebApp/build/css
    lrwxr-xr-x   1 your-username  staff     66 Apr 12 16:52 fonts -> /Users/your-username/MyProjects/WebApp/build/fonts
    lrwxr-xr-x   1 your-username  staff     64 Apr 12 16:52 img -> /Users/your-username/MyProjects/WebApp/build/img
    lrwxr-xr-x   1 your-username  staff     64 Apr 12 16:52 index.html -> /Users/your-username/MyProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 your-username  staff     71 Apr 12 16:52 javascript -> /Users/your-username/MyProjects/WebApp/build/javascript
    drwxr-xr-x   8 your-username  staff    256 Apr 12 16:34 plugins
    (WebAppEnv)Steves-iMac:www your-username$
    ```

    **If you started with iOS, then proceeded to Android, the code install for both platforms is now done.**

----------
## Other documentation pages:

**[Return to the WeVote Cordova home documentation page ](/README.md)**

**[Making an iOS Release](MakingAniOSrelease.md)**

**[Making an Android Release](MakingAnAndroidRelease.md)**

**[Cordova JavaScript Differences](CordovaJavaScriptDifferences.md)**

**[Testing with localhost from an actual phone](TestingWithLocalHostFromPhone.md)**

