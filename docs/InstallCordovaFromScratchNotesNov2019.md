Rebuild From Scratch

## MUST be at least at Cordova V9

```
Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ cd ~/WebstormProjects
Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ cordova -v
9.0.0 (cordova-lib@9.0.1)
Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ 
```
If you are not, follow the instructions for cordova-cli release 9.0.0
https://cordova.apache.org/announcements/2019/03/22/cordova-cli-release-9.0.0.html

Do not proceed until you are at V9

## Remove and add back in the cordova platforms

This is a destructive action and will require some work to resolve

```
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova platform remove ios android
Removing platform ios from config.xml file...
Removing ios from cordova.platforms array in package.json
Removing platform android from config.xml file...
Removing android from cordova.platforms array in package.json
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 
```

Add the platforms back in

```
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova platform add ios android
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
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 
```

We can ignore that "Source and destination must not be the same." warning for the whitelist plugin, since
installing cordova installs that plugin by default, where previously it was optional.

Double check that the android platform is at least at version 8, and ios at version 5!  Don't proceed until the platforms
are at the minimum versions.

```
Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ cordova platform ls
Installed platforms:
  android 8.1.0
  ios 5.0.1
Available platforms: 
  browser ^6.0.0
  electron ^1.0.0
  osx ^5.0.0
  windows ^7.0.0
Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ 
```

### Manually check that the Cocoapods were installed

Confirm that the install called the "pod install"

![screenshot](images/SeeThePods.png)




### Check the Symlinks

First in the base www directory, in my case /Users/stevepodell/WebstormProjects/WeVoteCordova/www

```
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cd www
Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ ls
bundle.js       index.html
Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ ls -la
total 16
drwxr-xr-x   4 stevepodell  staff   128 Oct 28 14:55 .
drwxr-xr-x  18 stevepodell  staff   576 Nov  3 16:05 ..
lrw-r--r--   1 stevepodell  staff    58 Oct 28 14:55 bundle.js -> /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js
-rw-r--r--   1 stevepodell  staff  6595 Oct 28 14:54 index.html
Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ 
```

Looks good in this example, if the bundle like is gone, add it back in.

1.  cd to the iOS specific code area, and the www directory in that area

    iOS serves the bundle.js, the index.html, and other files from `WeVoteCordova/platforms/ios/www`
    ```
    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
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
    (Note that the location of the img directory changed since we went to WebPack).

    ```
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ rm index.html
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html index.html
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/build/css css
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/src/img img
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/build/javascript javascript
    ```

    When you are done the ios www directory should look like this

    ```
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ ls -la
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
    Steves-MacBook-Pro-32GB-Oct-2018:www stevepodell$ 
    ```

### Do a quick test to make sure the C++/Objective C CocoaPods were installed for the Faceboook SDK

Open the project in XCode

Try and run it in a simulator, if you see the default Cordova Splash Screen, we are on the right path, 
maybe you will see the app running.

Close the simulator






##Prior to this from the GOLDEN experiment



If you already have WeVoteCordova installed, rename the directory to something else, or delete it
rm -fr WeVoteCordova

MUST MUST MUST start with Cordova V9, it determines the defaults for the platforms

https://cordova.apache.org/announcements/2019/03/22/cordova-cli-release-9.0.0.html

Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ cd ~/WebstormProjects
Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ cordova -v
9.0.0 (cordova-lib@9.0.1)
Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ 

DO NOT PROCEED UNTIL YOU ARE RUNNING CORDOVA V9 OR HIGHER

Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ cordova create WeVoteCordova org.wevote.cordova WeVoteCordova
Creating a new cordova project.
Steves-MacBook-Pro-32GB-Oct-2018:WebstormProjects stevepodell$ cd WeVoteCordova
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 

Load the ios platform

Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova platform add ios
Using cordova-fetch for cordova-ios@^5.0.0
Adding ios project...
Creating Cordova project for the iOS platform:
        Path: platforms/ios
        Package: org.wevote.cordova
        Name: WeVoteCordova
iOS project created with cordova-ios@5.0.1
Plugin 'cordova-plugin-whitelist' found in config.xml... Migrating it to package.json
Discovered saved plugin "cordova-plugin-whitelist". Adding it to the project
Installing "cordova-plugin-whitelist" for ios
Adding cordova-plugin-whitelist to package.json
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 

DO NOT PROCEED UNTIL YOU ARE RUNNING cordova-ios V5 OR HIGHER

Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova platform add android
Using cordova-fetch for cordova-android@^8.0.0
Adding android project...
Creating Cordova project for the Android platform:
        Path: platforms/android
        Package: org.wevote.cordova
        Name: WeVoteCordova
        Activity: MainActivity
        Android target: android-28
Subproject Path: CordovaLib
Subproject Path: app
Android project created with cordova-android@8.1.0
Installing "cordova-plugin-whitelist" for android
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 

DO NOT PROCEED UNTIL YOU ARE RUNNING cordova-android V8 OR HIGHER

Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova platform ls
Installed platforms:
  android 8.1.0
  ios 5.0.1
Available platforms: 
  browser ^6.0.0
  electron ^1.0.0
  osx ^5.0.0
  windows ^7.0.0
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 

Double check ios and android versions

Load the non-controversial cordova plugins

  526  cordova plugin add cordova-plugin-device
  527  cordova plugin add cordova-plugin-statusbar
  528  cordova plugin add cordova-plugin-keyboard
  529  cordova plugin add cordova-plugin-splashscreen
  530  cordova plugin add cordova-plugin-safariviewcontroller
  531  cordova plugin add cordova-plugin-inappbrowser

In Xcode open /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcworkspace
DO NOT OPEN platforms/ios/WeVoteCordova.xcodeproj OR ELSE!

Run what you have got in a simulator, and wait for the flashing green "DEVICE IS READY" icon on the default cordova 
splashscreen -- Success so far!

```
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"
Installing "cordova-plugin-facebook4" for android
Subproject Path: CordovaLib
Subproject Path: app
Installing "cordova-plugin-facebook4" for ios
Running command: pod install --verbose

[!] The `WeVoteCordova [Debug]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation

[!] The `WeVoteCordova [Release]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation

Adding cordova-plugin-facebook4 to package.json
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 
```

Confirm that the install called the "pod install"

![screenshot](images/SeeThePods.png)


Run the app in the simulator again, you should run with no errors, and see that green "DEVICE IS READY" icon again.

--------------------

















----------------------------------------



https://cordova.apache.org/#getstarted

    597  cd WebstormProjects/
    599  npm install -g cordova
    612  rm -fr WeVoteCordova
    613  cordova create WeVoteCordova org.wevote.cordova WeVoteCordova
    603  cd WeVoteCordova






pre Nov 3, 3pm



    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova platform add android
    Using cordova-fetch for cordova-android@~7.0.0
    Adding android project...
    Creating Cordova project for the Android platform:
            Path: platforms/android
            Package: org.wevote.cordova
            Name: WeVoteCordova
            Activity: MainActivity
            Android target: android-26
    Subproject Path: CordovaLib
    Subproject Path: app
    Android project created with cordova-android@7.0.0
    Android Studio project detected
    Android Studio project detected
    Installing "cordova-plugin-whitelist" for android
    --save flag or autosave detected
    Saving android@~7.0.0 into config.xml file ...
    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$

    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$  cordova platform add ios@5.0.0
    Using cordova-fetch for cordova-ios@5.0.0
    Adding ios project...
    Creating Cordova project for the iOS platform:
            Path: platforms/ios
            Package: org.wevote.cordova
            Name: WeVoteCordova
    iOS project created with cordova-ios@5.0.0
    Installing "cordova-plugin-whitelist" for ios
    --save flag or autosave detected
    Saving ios@~5.0.0 into config.xml file ...
    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$
    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova platform ls
    Installed platforms:
      android 7.0.0
      ios 5.0.0
    Available platforms:
      browser ~5.0.1
      osx ~4.0.1
      windows ~5.0.0
      www ^3.12.0
    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$


    624  npm install

    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova requirements
    Android Studio project detected
    
    Requirements check results for android:
    Java JDK: installed 1.8.0
    Android SDK: installed true
    Android target: installed android-Q,android-28,android-27,android-26,android-25,android-24,android-23
    Gradle: installed /usr/local/Cellar/gradle/5.4.1/bin/gradle
    
    Requirements check results for ios:
    Apple macOS: installed darwin
    Xcode: installed [object Object]
    ios-deploy: not installed
    ios-deploy was not found. Please download, build and install version 1.9.2 or greater from https://github.com/phonegap/ios-deploy into your path, or do 'npm install -g ios-deploy'
    CocoaPods: installed [object Object]
    (node:67910) UnhandledPromiseRejectionWarning: CordovaError: Some of requirements check failed
        at /usr/local/lib/node_modules/cordova/src/cli.js:414:27
        at _fulfilled (/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/q/q.js:787:54)
        at /usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/q/q.js:816:30
        at Promise.promise.promiseDispatch (/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/q/q.js:749:13)
        at /usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/q/q.js:557:44
        at flush (/usr/local/lib/node_modules/cordova/node_modules/cordova-lib/node_modules/q/q.js:108:17)
        at processTicksAndRejections (internal/process/task_queues.js:79:9)
    (node:67910) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
    (node:67910) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
    Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$

    645  sudo npm install --global --unsafe-perm ios-deploy
    646  npm install && npm test
    (no tests defined, so minor failure)

Open /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcworkspace with XCode, and run "Build" from the Product menu.
Success

    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios
    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$

    668  cordova plugin add cordova-plugin-whitelist
    669  cordova plugin add cordova-plugin-device
    670  cordova plugin add cordova-plugin-statusbar
    671  cordova plugin add cordova-plugin-keyboard
    672  cordova plugin add cordova-plugin-splashscreen
    673  cordova plugin add cordova-plugin-safariviewcontroller
    676  cordova plugin add cordova-plugin-inappbrowser 

Rebuild with XCode before installing the Facebook SDK  (ProductClean,  Product/Build)
Success

Run it in the Simulator, and you get the default cordova splash screen, with a green DEVICE IS READY msg.

    2019-11-03 13:29:27.227614-0800 WeVoteCordova[70692:2050954] Apache Cordova native platform version 5.0.0 is starting.
    2019-11-03 13:29:27.227764-0800 WeVoteCordova[70692:2050954] Multi-tasking -> Device: YES, App: YES
    2019-11-03 13:29:27.249484-0800 WeVoteCordova[70692:2050954]

    Started backup to iCloud! Please be careful.
    Your application might be rejected by Apple if you store too much data.
    For more information please read "iOS Data Storage Guidelines" at:
    https://developer.apple.com/icloud/documentation/data-storage/
    To disable web storage backup to iCloud, set the BackupWebStorage preference to "local" in the Cordova config.xml file
    2019-11-03 13:29:27.478192-0800 WeVoteCordova[70692:2050954] Using UIWebView
    2019-11-03 13:29:27.479222-0800 WeVoteCordova[70692:2050954] [CDVTimer][console] 0.046968ms
    2019-11-03 13:29:27.479533-0800 WeVoteCordova[70692:2050954] [CDVTimer][handleopenurl] 0.217080ms
    2019-11-03 13:29:27.480518-0800 WeVoteCordova[70692:2050954] [CDVTimer][intentandnavigationfilter] 0.841975ms
    2019-11-03 13:29:27.480709-0800 WeVoteCordova[70692:2050954] [CDVTimer][gesturehandler] 0.029922ms
    2019-11-03 13:29:27.482231-0800 WeVoteCordova[70692:2050954] [CDVTimer][statusbar] 1.425028ms
    2019-11-03 13:29:27.482693-0800 WeVoteCordova[70692:2050954] [CDVTimer][keyboard] 0.326991ms
    2019-11-03 13:29:27.511940-0800 WeVoteCordova[70692:2050954] [CDVTimer][splashscreen] 29.157996ms
    2019-11-03 13:29:27.512056-0800 WeVoteCordova[70692:2050954] [CDVTimer][TotalPluginStartup] 32.911062ms
    2019-11-03 13:29:28.281686-0800 WeVoteCordova[70692:2050954] Resetting plugins due to page load.
    2019-11-03 13:29:28.314161-0800 WeVoteCordova[70692:2050954] Failed to load webpage with error: The operation couldn’t be completed. (NSURLErrorDomain error -999.)
    2019-11-03 13:29:28.315651-0800 WeVoteCordova[70692:2050954] Resetting plugins due to page load.
    2019-11-03 13:29:28.453498-0800 WeVoteCordova[70692:2050954] Finished load of: file:///Users/stevepodell/Library/Developer/CoreSimulator/Devices/44E0E346-E95A-4389-9A58-497796CC7534/data/Containers/Bundle/Application/7F5D1987-DEA6-4736-9CD8-2CA0304DDA9C/WeVoteCordova.app/www/index.html
    2019-11-03 13:29:28.533840-0800 WeVoteCordova[70692:2050954] Received Event: deviceready

Install facebook plugin (and indirectly the facebook api)

    678  cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"
 
Get /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova/Plugins/cordova-plugin-facebook4/FacebookConnectPlugin.h:13:9: 'FBSDKCoreKit/FBSDKCoreKit.h' file not found

* [Stack Overlow "Removing pods from the project and re-installing worked for me"](https://stackoverflow.com/questions/21366549/error-the-sandbox-is-not-in-sync-with-the-podfile-lock-after-installing-re)
Removing pods from the project and re-installing worked for me.
There is nice GitHub repository that can completely remove the pods from the project.
Just keep the backup of your PodFile and run below commands.
```gem install cocoapods-deintegrate
    gem install cocoapods-clean
    Go to the project directory and run 
        pod deintegrate
    Again run 
        pod clean
    Run pod install
    Clean and run.
```

    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ pod deintegrate
    Deintegrating `WeVoteCordova.xcodeproj`
    Deleted 1 'Check Pods Manifest.lock' build phases.
    - libPods-WeVoteCordova.a
    Deleting Pod file references from project
    - Pods-WeVoteCordova.debug.xcconfig
    - Pods-WeVoteCordova.release.xcconfig
    Removing `Pods` directory.
    
    Project has been deintegrated. No traces of CocoaPods left in project.
    Note: The workspace referencing the Pods project still remains.
    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ pod clean
    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ pod install
    Analyzing dependencies
    Downloading dependencies
    Generating Pods project
    Integrating client project
    
    [!] Please close any current Xcode sessions and use `WeVoteCordova.xcworkspace` for this project from now on.
    Pod installation complete! There are 0 dependencies from the Podfile and 0 total pods installed.
    
    [!] The Podfile does not contain any dependencies.
    
    [!] The `WeVoteCordova [Debug]` target overrides the `PODS_PODFILE_DIR_PATH` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    
    [!] The `WeVoteCordova [Debug]` target overrides the `PODS_ROOT` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    
    [!] The `WeVoteCordova [Release]` target overrides the `PODS_PODFILE_DIR_PATH` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    
    [!] The `WeVoteCordova [Release]` target overrides the `PODS_ROOT` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$

    690  pod deintegrate
    691  pod clean
    692  pod install
    693  sudo gem install cocoapods-dependencies
    694  pod dependencies
    695  pod update
    696  pod install
 

Manually edited the Podfile to be:
    # DO NOT MODIFY -- auto-generated by Apache Cordova
    
    platform :ios, '9.0'
    
    target 'WeVoteCordova' do
        project 'WeVoteCordova.xcodeproj'
    
        # Pods for WeVoteCordova
        pod 'FBSDKCoreKit', '5.7.0'
        pod 'FBSDKLoginKit', '5.7.0'
        pod 'FBSDKShareKit', '5.7.0'
    end

    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ pod install
    Analyzing dependencies
    Downloading dependencies
    Installing FBSDKCoreKit (5.7.0)
    Installing FBSDKLoginKit (5.7.0)
    Installing FBSDKShareKit (5.7.0)
    Generating Pods project
    Integrating client project
    Pod installation complete! There are 3 dependencies from the Podfile and 3 total pods installed.
    
    [!] The `WeVoteCordova [Debug]` target overrides the `PODS_PODFILE_DIR_PATH` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    
    [!] The `WeVoteCordova [Debug]` target overrides the `PODS_ROOT` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    
    [!] The `WeVoteCordova [Release]` target overrides the `PODS_PODFILE_DIR_PATH` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    
    [!] The `WeVoteCordova [Release]` target overrides the `PODS_ROOT` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation
        - Use the `$(inherited)` flag, or
        - Remove the build settings from the target.
    Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ 

Try again

    698  pod install
    699  pod deintegrate
    700  pod clean
    701  pod install

Same error

Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ cordova --version
8.0.0
Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ 


https://cordova.apache.org/docs/en/latest/guide/cli/index.html

Steves-MacBook-Pro-32GB-Oct-2018:ios stevepodell$ cordova plugin rm cordova-plugin-facebook4

App works in simulator


https://cordova.apache.org/announcements/2019/03/22/cordova-cli-release-9.0.0.html

FIX THE SYMBOLIC LINK IN /usr/local/bin/ to point to where the cordova 9 lives

Steves-MacBook-Pro-32GB-Oct-2018:bin stevepodell$ ln -s /usr/local/Cellar/node/11.14.0_1/lib/node_modules/cordova/bin/cordova cordova
S
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cd ~/WebstormProjects/WeVoteCordova
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ cordova -v
9.0.0 (cordova-lib@9.0.1)
Steves-MacBook-Pro-32GB-Oct-2018:WeVoteCordova stevepodell$ 

  756  cordova prepare ios
  757  cordova compile ios
  758  cordova plugin rm cordova-plugin-facebook4
  759  cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"
  760  rm /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/app/src/main/res/values/facebookconnect.xml
  761  cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"


It worked, We **needed** cordova V9

Do it again!
