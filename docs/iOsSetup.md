
## Platform specific iOS setup

1.  cd to the iOS specific code area, and the www directory in that area

    iOS serves the bundle.js, the index.html, and other files from `WeVoteCordova/platforms/ios/www`
    ```
    cd /Users/stevepodell/MyProjects/WeVoteCordova/platforms/ios/www
    ```

1.  bundle.js

    There will be a `bundle.js` file in that www directory, but it would instantly get outdated as you
    update the WebApp in the course of developing the Cordova app, so delete it, and make a symbolic link to where the
    WebApp compile process leaves the new `bundle.js`

    ```
    rm bundle.js
    ln -s /Users/stevepodell/MyProjects/WebApp/build/js/bundle.js bundle.js
    ```

1.  Make the other symlinks that the iOS cordova app will need while running

    ```
    rm index.html
    ln -s /Users/stevepodell/MyProjects/WeVoteCordova/www/index.html index.html
    ln -s /Users/stevepodell/MyProjects/WebApp/build/css css
    ln -s /Users/stevepodell/MyProjects/WebApp/build/fonts fonts
    ln -s /Users/stevepodell/MyProjects/WebApp/build/img img
    ln -s /Users/stevepodell/MyProjects/WebApp/build/javascript javascript
    ```

    When you are done the ios www directory should look like this

    ```
    Steves-iMac:www stevepodell$ pwd
    /Users/stevepodell/MyProjects/WeVoteCordova/platforms/ios/www
    Steves-iMac:www stevepodell$ ls -la
    total 168
    drwxr-xr-x  12 stevepodell  staff    384 Apr 29 14:24 .
    drwxr-xr-x  14 stevepodell  staff    448 Apr 29 13:45 ..
    lrwxr-xr-x   1 stevepodell  staff     55 Apr 29 14:22 bundle.js -> /Users/stevepodell/MyProjects/WebApp/build/js/bundle.js
    drwxr-xr-x   5 stevepodell  staff    160 Apr 29 13:45 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  78044 Apr 29 13:45 cordova.js
    -rw-r--r--   1 stevepodell  staff   1845 Apr 29 13:45 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     46 Apr 29 14:23 css -> /Users/stevepodell/MyProjects/WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     48 Apr 29 14:24 fonts -> /Users/stevepodell/MyProjects/WebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff     46 Apr 29 14:24 img -> /Users/stevepodell/MyProjects/WebApp/build/img
    lrwxr-xr-x   1 stevepodell  staff     58 Apr 29 14:22 index.html -> /Users/stevepodell/MyProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 stevepodell  staff     53 Apr 29 14:24 javascript -> /Users/stevepodell/MyProjects/WebApp/build/javascript
    drwxr-xr-x   8 stevepodell  staff    256 Apr 29 13:45 plugins
    Steves-iMac:www stevepodell$ 
    ```
    
1.  If you want to test one of those links to see if it really points to where it needs to, stat can confirm it for you

    ```
    Steves-iMac:www stevepodell$ stat -L bundle.js
    16777221 4560157 -rw-r--r-- 1 stevepodell staff 0 17368113 "May 27 14:48:20 2018" "May 27 14:48:11 2018" "May 27 14:48:11 2018" "May 27 14:24:41 2018" 4194304 33928 0 bundle.js
    Steves-iMac:www stevepodell$ 
    ```

----------
## Next Step:

**[Setting up your Computer for Android Development](AndroidSetup.md)**

----------
## Other documentation pages:

**[Return to the WeVote Cordova home documentation page ](/README.md)**

**[Setting up your Computer for Android Development](AndroidSetup.md)**

**[Making an iOS Release](MakingAniOSrelease.md)**

**[Making an Android Release](MakingAnAndroidRelease.md)**

**[Cordova JavaScript Differences](CordovaJavaScriptDifferences.md)**

**[Testing with localhost from an actual phone](TestingWithLocalHostFromPhone.md)**

