Updating to Cordova Version 9

## Your setup MUST be at least at Cordova V9
```
Steves-MacBook:www stevepodell$ cd ~/WebstormProjects/WeVoteCordova
Steves-MacBook:WeVoteCordova stevepodell$ cordova -v
9.0.0 (cordova-lib@9.0.1)
Steves-MacBook:WeVoteCordova stevepodell$ 
```
If you are still at Version 8, follow the instructions for [cordova-cli release 9.0.0](
https://cordova.apache.org/announcements/2019/03/22/cordova-cli-release-9.0.0.html)
```
sudo npm uninstall -g cordova
sudo npm install -g cordova@9.0.0
```
Do not proceed until you are at V9.  (I had to go fix a symlink in `/usr/local/bin/` to point to where the Cordova 9 was installed in the prior step.)
```
Steves-MacBook:WeVoteCordova stevepodell$ cordova -v
9.0.0 (cordova-lib@9.0.1)
Steves-MacBook:WeVoteCordova stevepodell$ 
```

## Remove, and then add back in, the cordova platforms

This is a destructive action and will require some work to resolve

```
Steves-MacBook:WeVoteCordova stevepodell$ cordova platform remove ios android
Removing platform ios from config.xml file...
Removing ios from cordova.platforms array in package.json
Removing platform android from config.xml file...
Removing android from cordova.platforms array in package.json
Steves-MacBook:WeVoteCordova stevepodell$ 
```

Add the platforms back in

```
Steves-MacBook:WeVoteCordova stevepodell$ cordova platform add ios android
Using cordova-fetch for cordova-ios@^5.0.0
Adding ios project...
Creating Cordova project for the iOS platform:
        Path: platforms/ios
        Package: org.wevote.cordova
        Name: WeVoteCordova
iOS project created with cordova-ios@5.0.1
Installing "cordova-plugin-device" for ios
Installing "cordova-plugin-facebook4" for ios
Running command: pod install --verbose

[!] The `WeVoteCordova [Debug]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation

[!] The `WeVoteCordova [Release]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation

Installing "cordova-plugin-inappbrowser" for ios
Installing "cordova-plugin-keyboard" for ios
Installing "cordova-plugin-safariviewcontroller" for ios
Installing "cordova-plugin-screensize" for ios
Installing "cordova-plugin-splashscreen" for ios
Installing "cordova-plugin-statusbar" for ios
Installing "cordova-plugin-whitelist" for ios
Source and destination must not be the same.
Steves-MacBook:WeVoteCordova stevepodell$ 
```

We can ignore that "Source and destination must not be the same." warning for the whitelist plugin, since
installing cordova installs that plugin by default, where previously it was optional.  Those target override warnings
also happen on an absolutely from zero install, so we can safely ignore them.

Double check that the android platform is at least at version 8, and ios at version 5!  Don't proceed until the platforms
are at the minimum versions.

```
Steves-MacBook:www stevepodell$ cordova platform ls
Installed platforms:
  android 8.1.0
  ios 5.0.1
Available platforms: 
  browser ^6.0.0
  electron ^1.0.0
  osx ^5.0.0
  windows ^7.0.0
Steves-MacBook:www stevepodell$ 
```

### Manually check that the Cocoapods were installed

Cocoapods is just one more package manager, in this case for native ios code -- if all is well, Cocoapods will just install in the background, and we won't have to 
mess with them, or their setup.  (This was not the case in the past.) 

Confirm that when the "cordova-plugin-facebook4" was reinstalled, it kicked off a "pod install" that installed 
FBSDKCoreKit, FBSDKLoginKit, & the FBSDKShareKit.  These "Pods" are the nativecode ios SDK for Facebook.  You will see the
three Pod packages under Pods in `platforms/ios/Pods`.

![screenshot](images/SeeThePods.png)

### Check the Symlinks

First in the base www directory, in my case /Users/stevepodell/WebstormProjects/WeVoteCordova/www

```
Steves-MacBook:WeVoteCordova stevepodell$ cd www
Steves-MacBook:www stevepodell$ ls
bundle.js       index.html
Steves-MacBook:www stevepodell$ ls -la
total 16
drwxr-xr-x   4 stevepodell  staff   128 Oct 28 14:55 .
drwxr-xr-x  18 stevepodell  staff   576 Nov  3 16:05 ..
lrw-r--r--   1 stevepodell  staff    58 Oct 28 14:55 bundle.js -> /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js
-rw-r--r--   1 stevepodell  staff  6595 Oct 28 14:54 index.html
Steves-MacBook:www stevepodell$ 
```

Looks good in this example, if the bundle like is gone, add it back in.

1.  cd to the iOS specific code area, and the www directory in that area

    iOS serves the bundle.js, the index.html, and other files from `WeVoteCordova/platforms/ios/www`
    ```
    Steves-MacBook:ios stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
    ```

1.  bundle.js

    There will be a `bundle.js` file in that www directory, but it would instantly get outdated as you
    update the WebApp in the course of developing the Cordova app, so delete it, and make a symbolic link to where the
    WebApp compile process leaves the new `bundle.js`

    ```
    rm bundle.js
    ln -s /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js bundle.js
    ```

1.  Make the other symlinks that the iOS cordova app will need while running.  

    ```
    Steves-MacBook:www stevepodell$ rm index.html
    Steves-MacBook:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html index.html
    Steves-MacBook:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/build/css css
    Steves-MacBook:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/src/img img
    Steves-MacBook:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/build/javascript javascript
    ```

    (Note that the location of the img directory changed, since we changed to WebPack on the WebApp).
    When you are done the ios www directory should look like this,,,

    ```
    Steves-MacBook:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
    Steves-MacBook:www stevepodell$ ls -la
    total 144
    drwxr-xr-x  11 stevepodell  staff    352 Nov  3 16:27 .
    drwxr-xr-x  19 stevepodell  staff    608 Nov  3 16:08 ..
    lrwxr-xr-x   1 stevepodell  staff     58 Nov  3 16:05 bundle.js -> /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js
    drwxr-xr-x   5 stevepodell  staff    160 Nov  3 16:05 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  69139 Nov  3 16:05 cordova.js
    -rw-r--r--   1 stevepodell  staff   2501 Nov  3 16:05 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     52 Nov  3 16:26 css -> /Users/stevepodell/WebstormProjects/WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     50 Nov  3 16:26 img -> /Users/stevepodell/WebstormProjects/WebApp/src/img
    lrwxr-xr-x   1 stevepodell  staff     64 Nov  3 16:26 index.html -> /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 stevepodell  staff     59 Nov  3 16:27 javascript -> /Users/stevepodell/WebstormProjects/WebApp/build/javascript
    drwxr-xr-x  10 stevepodell  staff    320 Nov  3 16:05 plugins
    Steves-MacBook:www stevepodell$ 
    ```

### Do a quick test to make sure the C++/Objective C CocoaPods were installed for the Faceboook SDK

Open the project in XCode

Try and run it in a simulator, if you see the default Cordova Splash Screen, we are on the right path, 
maybe you will see the app running.

Close the simulator
