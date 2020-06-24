## Create the project
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WebstormProjects % cordova create  WeVoteCordova us.wevote.wevotecordova WeVoteCordova
    Creating a new cordova project.
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WebstormProjects % cordova -v
    9.0.0 (cordova-lib@9.0.1)
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WebstormProjects % cd WeVoteCordova
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova platform add ios android
    Using cordova-fetch for cordova-ios@^5.0.0
    (node:21089) Warning: Accessing non-existent property 'ios' of module exports inside circular dependency
    (Use `node --trace-warnings ...` to show where the warning was created)
    (node:21089) Warning: Accessing non-existent property 'android' of module exports inside circular dependency
    Adding ios project...
    Creating Cordova project for the iOS platform:
            Path: platforms/ios
            Package: us.wevote.wevotecordova
            Name: WeVoteCordova
    iOS project created with cordova-ios@5.1.1
    Plugin 'cordova-plugin-whitelist' found in config.xml... Migrating it to package.json
    Discovered saved plugin "cordova-plugin-whitelist". Adding it to the project
    Installing "cordova-plugin-whitelist" for ios
    Adding cordova-plugin-whitelist to package.json
    Using cordova-fetch for cordova-android@^8.0.0
    Adding android project...
    Creating Cordova project for the Android platform:
            Path: platforms/android
            Package: us.wevote.wevotecordova
            Name: WeVoteCordova
            Activity: MainActivity
            Android target: android-28
    Subproject Path: CordovaLib
    Subproject Path: app
    Android project created with cordova-android@8.1.0
    Installing "cordova-plugin-whitelist" for android
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova %

### Copied source controlled files from current WeVoteCordova in Git
    /docs
    /res
    .gitignore
    .npmignore
    Jan2020-README.MD
    README.MD

### Added the facebook4 plugin that requires config on the command line
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"

    Installing "cordova-plugin-facebook4" for android
    Subproject Path: CordovaLib
    Subproject Path: app
    Installing "cordova-plugin-facebook4" for ios
    Running command: pod install --verbose
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/cache.rb:114: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/request.rb:61: warning: The called method `slug' is defined here
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/cache.rb:100: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/request.rb:61: warning: The called method `slug' is defined here
    /usr/local/lib/ruby/gems/2.7.0/gems/nanaimo-0.2.6/lib/nanaimo/writer/pbxproj.rb:13: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
    /usr/local/lib/ruby/gems/2.7.0/gems/nanaimo-0.2.6/lib/nanaimo/writer.rb:35: warning: The called method `initialize' is defined here
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete

    [!] The `WeVoteCordova [Debug]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation
    [!] The `WeVoteCordova [Release]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation
    Adding cordova-plugin-facebook4 to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova %

### Added the other plugins and confirmed that they were the current versions

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-device
    Installing "cordova-plugin-device" for android
    Installing "cordova-plugin-device" for ios
    Adding cordova-plugin-device to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add https://github.com/apache/cordova-plugin-inappbrowser.git
    Installing "cordova-plugin-inappbrowser" for android
    Installing "cordova-plugin-inappbrowser" for ios
    Adding cordova-plugin-inappbrowser to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-keyboard
    Installing "cordova-plugin-keyboard" for android
    Installing "cordova-plugin-keyboard" for ios
    Adding cordova-plugin-keyboard to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-safariviewcontroller
    Installing "cordova-plugin-safariviewcontroller" for android
    Subproject Path: CordovaLib
    Subproject Path: app
    Installing "cordova-plugin-safariviewcontroller" for ios
    Adding cordova-plugin-safariviewcontroller to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-screensize
    Installing "cordova-plugin-screensize" for android
    Installing "cordova-plugin-screensize" for ios
    Adding cordova-plugin-screensize to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-sign-in-with-apple
    Installing "cordova-plugin-sign-in-with-apple" for android
    Installing "cordova-plugin-sign-in-with-apple" for ios
    Adding cordova-plugin-sign-in-with-apple to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-splashscreen
    Installing "cordova-plugin-splashscreen" for android
    Installing "cordova-plugin-splashscreen" for ios
    Adding cordova-plugin-splashscreen to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-statusbar
    Installing "cordova-plugin-statusbar" for android
    Installing "cordova-plugin-statusbar" for ios
    Adding cordova-plugin-statusbar to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-taptic-engine
    Installing "cordova-plugin-taptic-engine" for android
    Installing "cordova-plugin-taptic-engine" for ios
    Adding cordova-plugin-taptic-engine to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin ls
    cordova-plugin-device 2.0.3 "Device"
    cordova-plugin-facebook4 6.4.0 "Facebook Connect"
    cordova-plugin-inappbrowser 4.0.1-dev "InAppBrowser"
    cordova-plugin-keyboard 1.2.0 "Keyboard"
    cordova-plugin-safariviewcontroller 1.6.0 "SafariViewController"
    cordova-plugin-screensize 1.3.1 "screensize"
    cordova-plugin-sign-in-with-apple 0.0.1 "cordova-plugin-sign-in-with-apple"
    cordova-plugin-splashscreen 5.0.4 "Splashscreen"
    cordova-plugin-statusbar 2.4.3 "StatusBar"
    cordova-plugin-taptic-engine 2.1.0 "Taptic Engine"
    cordova-plugin-whitelist 1.3.4 "Whitelist"
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova %

### Set up the sym links for iOS

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % ls -la
    total 160
    drwxr-xr-x  11 stevepodell  staff    352 Jun 23 13:07 .
    drwxr-xr-x  19 stevepodell  staff    608 Jun 23 13:04 ..
    lrwxr-xr-x   1 stevepodell  staff     58 Jun 23 13:07 bundle.js -> /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js
    drwxr-xr-x   6 stevepodell  staff    192 Jun 23 12:50 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  69846 Jun 23 12:50 cordova.js
    -rw-r--r--   1 stevepodell  staff   3110 Jun 23 13:00 cordova_plugins.js
    drwxr-xr-x   4 stevepodell  staff    128 Jun 23 13:07 css
    drwxr-xr-x   4 stevepodell  staff    128 Jun 23 13:07 img
    -rwxr-xr-x   1 stevepodell  staff   2481 Jun 23 12:50 index.html
    drwxr-xr-x   3 stevepodell  staff     96 Jun 23 12:50 js
    drwxr-xr-x  12 stevepodell  staff    384 Jun 23 13:00 plugins
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % rm index.html
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % rm -fr css
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % rm -fr img
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % ln -s  /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html index.html
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % ln -s /Users/stevepodell/WebstormProjects/WebApp/build/img img
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % ln -s /Users/stevepodell/WebstormProjects/WebApp/build/css css
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % ls -la
    total 152
    drwxr-xr-x  11 stevepodell  staff    352 Jun 23 13:36 .
    drwxr-xr-x  19 stevepodell  staff    608 Jun 23 13:04 ..
    lrwxr-xr-x   1 stevepodell  staff     58 Jun 23 13:07 bundle.js -> /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js
    drwxr-xr-x   6 stevepodell  staff    192 Jun 23 12:50 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  69846 Jun 23 12:50 cordova.js
    -rw-r--r--   1 stevepodell  staff   3110 Jun 23 13:00 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     52 Jun 23 13:35 css -> /Users/stevepodell/WebstormProjects/WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     52 Jun 23 13:36 img -> /Users/stevepodell/WebstormProjects/WebApp/build/img
    lrwxr-xr-x   1 stevepodell  staff     64 Jun 23 13:12 index.html -> /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html
    drwxr-xr-x   3 stevepodell  staff     96 Jun 23 12:50 js
    drwxr-xr-x  12 stevepodell  staff    384 Jun 23 13:00 plugins
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www %

Worked correctly in the simulator!
Switched over to bundle.js and started right up in webapp.

### Check that cordova requirements have been met

stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % cordova requirements

Requirements check results for android:
Java JDK: installed 1.8.0
Android SDK: installed true
Android target: installed android-Q,android-28,android-27,android-26,android-25,android-24,android-23
Gradle: installed /usr/local/Cellar/gradle/6.3/bin/gradle

Requirements check results for ios:
Apple macOS: installed darwin
Xcode: installed 11.5
ios-deploy: installed 1.10.0
CocoaPods: installed 1.8.4
stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www %

### Copy the launch icons from `res/` to the `LaunchStoryboard` in Xcode and the icons to the `Images.xcassets`

That's it!  Rebuilt in about an hour.  




