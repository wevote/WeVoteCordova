# Platform specific iOS setup

Throughout these instructions, remember to substitute your actual user name for "your-username"!

1.  cd to the iOS specific code area, and the www directory in that area

    iOS serves the bundle.js, the index.html, and other files from `WeVoteCordova/platforms/ios/www`
    ```
    cd /Users/your-username/MyProjects/WeVoteCordova/platforms/ios/www
    ```

1.  bundle.js

    There will be a `bundle.js` file in that www directory, but it would instantly get outdated as you
    update the WebApp in the course of developing the Cordova app, so delete it, and make a symbolic link to where the
    WebApp compile process leaves the new `bundle.js`

    ```
    rm bundle.js
    ln -s /Users/your-username/MyProjects/WebApp/build/js/bundle.js bundle.js
    ```

1.  Make the other symlinks that the iOS cordova app will need while running.  (Remember to substitute your actual user name
 in place of 'your-username'!)

    ```
    rm index.html
    ln -s /Users/your-username/MyProjects/WeVoteCordova/www/index.html index.html
    ln -s /Users/your-username/MyProjects/WebApp/build/css css
    ln -s /Users/your-username/MyProjects/WebApp/build/fonts fonts
    ln -s /Users/your-username/MyProjects/WebApp/build/img img
    ln -s /Users/your-username/MyProjects/WebApp/build/javascript javascript
    ```

    When you are done the ios www directory should look like this

    ```
    Steves-iMac:www your-username$ pwd
    /Users/your-username/WebstormProjects/WeVoteCordova/platforms/ios/www
    Steves-iMac:www your-username$ ls -la
    total 168
    drwxr-xr-x  12 your-username  staff    384 Oct 14 00:11 .
    drwxr-xr-x  14 your-username  staff    448 Nov  8 12:15 ..
    lrwxr-xr-x   1 your-username  staff     61 Jun  5  2018 bundle.js -> /Users/your-username/MyProjects/WebApp/build/js/bundle.js
    drwxr-xr-x   5 your-username  staff    160 Oct 14 00:11 cordova-js-src
    -rw-r--r--   1 your-username  staff  78044 Jun  5  2018 cordova.js
    -rw-r--r--   1 your-username  staff   2122 Nov  5 12:55 cordova_plugins.js
    lrwxr-xr-x   1 your-username  staff     52 Jun  5  2018 css -> /Users/your-username/MyProjects/WebApp/build/css
    lrwxr-xr-x   1 your-username  staff     54 Jun  5  2018 fonts -> /Users/your-username/MyProjects/WebApp/build/fonts
    lrwxr-xr-x   1 your-username  staff     52 Jun  5  2018 img -> /Users/your-username/MyProjects/WebApp/build/img
    lrwxr-xr-x   1 your-username  staff     64 Jun  5  2018 index.html -> /Users/your-username/MyProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 your-username  staff     59 Jun  5  2018 javascript -> /Users/your-username/MyProjects/WebApp/build/javascript
    drwxr-xr-x   9 your-username  staff    288 Nov  5 12:55 plugins
    Steves-iMac:www your-username$ 
    ```
    
1.  You should test each one of those links, to make sure that they really point to where it needs to. It is much easier 
to test first, than to diagnose the problem later on.  Use `stat -L` to confirm 
that the link points to a sizeable file (17856048 bytes in the case of bundle.js), if stat reports a file size of less than 
100 bytes, then the link is probably incorrect.  Use `ls` to make sure that the links for directories, contain a few files.

    ```
    Steves-iMac:www your-username$ pwd
    /Users/your-username/MyProjects/WeVoteCordova/platforms/ios/www
    Steves-iMac:www your-username$ stat -L bundle.js
    16777220 57914434 -rw-r--r-- 1 your-username staff 0 17856048 "Feb 13 13:53:16 2019" "Feb 13 13:53:16 2019" "Feb 13 13:53:16 2019" "Feb 13 13:52:45 2019" 4096 34880 0 bundle.js
    Steves-iMac:www your-username$ ls css
    bootstrap.css           bootstrap.css.map       loading-screen.css      loading-screen.css.map  main.css                main.css.map
    Steves-iMac:www your-username$ ls fonts
    FontAwesome.otf                         app-fonts.ttf                           fontawesome-webfont.svg                 fontawesome-webfont.woff2               glyphicons-halflings-regular.ttf
    app-fonts.eot                           app-fonts.woff                          fontawesome-webfont.ttf                 glyphicons-halflings-regular.eot        glyphicons-halflings-regular.woff
    app-fonts.svg                           fontawesome-webfont.eot                 fontawesome-webfont.woff                glyphicons-halflings-regular.svg        glyphicons-halflings-regular.woff2
    Steves-iMac:www your-username$ ls img
    global  tools   welcome
    Steves-iMac:www your-username$ stat -L index.html
    16777220 39211364 -rw-r--r-- 1 your-username staff 0 6393 "Feb 13 12:46:51 2019" "Nov 26 14:08:33 2018" "Nov 26 14:08:33 2018" "Nov 26 14:08:33 2018" 4096 16 0 index.html
    Steves-iMac:www your-username$ ls javascript
    google-analytics-template.js    google-tag-manager-template.js
    Steves-iMac:www your-username$ 
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

