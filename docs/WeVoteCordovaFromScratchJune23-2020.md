    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WebstormProjects % cordova create WeVoteCordova
    Creating a new cordova project.
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WebstormProjects % 


stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WebstormProjects % cd WeVoteCordova
stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % ls -la
total 16
drwxr-xr-x   8 stevepodell  staff   256 Jun 22 21:03 .
drwxr-xr-x  34 stevepodell  staff  1088 Jun 22 21:03 ..
-rw-r--r--   1 stevepodell  staff   992 Jun 22 21:03 config.xml
drwxr-xr-x   3 stevepodell  staff    96 Jun 22 21:03 hooks
-rw-r--r--   1 stevepodell  staff   414 Jun 22 21:03 package.json
drwxr-xr-x   2 stevepodell  staff    64 Jun 22 21:03 platforms
drwxr-xr-x   2 stevepodell  staff    64 Jun 22 21:03 plugins
drwxr-xr-x   6 stevepodell  staff   192 Jun 22 21:03 www
stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova platform add ios android
Using cordova-fetch for cordova-ios@^5.0.0
(node:96964) Warning: Accessing non-existent property 'ios' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
(node:96964) Warning: Accessing non-existent property 'android' of module exports inside circular dependency
Adding ios project...
Creating Cordova project for the iOS platform:
        Path: platforms/ios
        Package: io.cordova.hellocordova
        Name: HelloCordova
iOS project created with cordova-ios@5.1.1
Plugin 'cordova-plugin-whitelist' found in config.xml... Migrating it to package.json
Discovered saved plugin "cordova-plugin-whitelist". Adding it to the project
Installing "cordova-plugin-whitelist" for ios
Adding cordova-plugin-whitelist to package.json
Using cordova-fetch for cordova-android@^8.0.0
Adding android project...
Creating Cordova project for the Android platform:
        Path: platforms/android
        Package: io.cordova.hellocordova
        Name: HelloCordova
        Activity: MainActivity
        Android target: android-28
Subproject Path: CordovaLib
Subproject Path: app
Android project created with cordova-android@8.1.0
Installing "cordova-plugin-whitelist" for android
stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova run ios
    No simulator found for ". Falling back to the default target.
    Building for "iPhone SE (2nd generation)" Simulator (com.apple.CoreSimulator.SimDeviceType.iPhone-SE--2nd-generation-, iPhone-SE--2nd-generation-).
    Building project: /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/HelloCordova.xcworkspace
            Configuration: Debug
            Platform: emulator
            Target: iPhone SE (2nd generation)
    Running command: xcodebuild -workspace HelloCordova.xcworkspace -scheme HelloCordova -configuration Debug -sdk iphonesimulator -destination platform=iOS Simulator,name=iPhone SE (2nd generation) build CONFIGURATION_BUILD_DIR=/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/build/emulator SHARED_PRECOMPS_DIR=/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/build/sharedpch
    Command line invocation:
        /Applications/Xcode.app/Contents/Developer/usr/bin/xcodebuild -workspace HelloCordova.xcworkspace -scheme HelloCordova -configuration Debug -sdk iphonesimulator -destination "platform=iOS Simulator,name=iPhone SE (2nd generation)" build CONFIGURATION_BUILD_DIR=/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/build/emulator SHARED_PRECOMPS_DIR=/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/build/sharedpch
    
    Build settings from command line:
        CONFIGURATION_BUILD_DIR = /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/build/emulator
        SDKROOT = iphonesimulator13.5
        SHARED_PRECOMPS_DIR = /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/build/sharedpch
    
    note: Using new build system
    note: Building targets in parallel
    note: Planning build
    note: Constructing build description
    CreateBuildDirectory /Users/stevepodell/Library/Developer/Xcode/DerivedData/HelloCordova-bqwhkayodraedggxanyiuaalczep/Build/Products (in target 'CordovaLib' from project 'CordovaLib')
        cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/CordovaLib
        builtin-create-build-directory /Users/stevepodell/Library/Developer/Xcode/DerivedData/HelloCordova-bqwhkayodraedggxanyiuaalczep/Build/Products
    
    CreateBuildDirectory /Users/stevepodell/Library/Developer/Xcode/DerivedData/HelloCordova-bqwhkayodraedggxanyiuaalczep/Build/Intermediates.noindex (in target 'CordovaLib' from project 'CordovaLib')
        cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/CordovaLib

(ran the equivalent of the hello program)

-------------
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
    
    
    [!] The `HelloCordova [Debug]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-HelloCordova/Pods-HelloCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation
    
    [!] The `HelloCordova [Release]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-HelloCordova/Pods-HelloCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation
    
    Adding cordova-plugin-facebook4 to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 

cordova run ios still worked
-----

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
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-whitelist    
    Plugin "cordova-plugin-whitelist" already installed on android.
    Plugin "cordova-plugin-whitelist" already installed on ios.
    Adding cordova-plugin-whitelist to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 

