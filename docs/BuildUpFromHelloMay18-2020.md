# In May/June 2020, completely rebuilt from scratch using their standard helloworld demo app, and converting it to WeVoteCordova

      678  cordova create hello com.example.hello HelloWorld
      679  ls -la
      680  cd hello
      681  cordova platform add ios
      682  cordova platform add android
      683  cordova platform ls
      684  cordova requirements
      685  cordova build
      686  cordova build ios

Seems to have installed cococapods for me!

      697  brew install git
      698  cordova plugin add cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"
      699  cordova plugin remove cordova-plugin-facebook4
      700  cordova plugin update cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"

## This works, and is so much simpler than prior installs

Update to a specific version of cocoapods to resolve some problem (can't remember which)
 
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % sudo gem install cocoapods -v1.8.4
    Password:
    Successfully installed cocoapods-1.8.4
    Parsing documentation for cocoapods-1.8.4
    Done installing documentation for cocoapods after 1 seconds
    1 gem installed
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % pod setup
    usage: dirname path
    Setting up CocoaPods master repo
      $ /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/bin/git -C /Users/stevepodell/.cocoapods/repos/master fetch origin --progress
      fatal: Unable to find remote helper for 'https'
    [!] CocoaPods was not able to update the `master` repo. If this is an unexpected issue and persists you can inspect it running `pod repo update --verbose`
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % pod repo update --verbose
    usage: dirname path
      fatal: Unable to find remote helper for 'https'
    [!] CocoaPods was not able to update the `master` repo. If this is an unexpected issue and persists you can inspect it running `pod repo update --verbose`
    
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/sources_manager.rb:114:in `rescue in update_git_repo'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/sources_manager.rb:106:in `update_git_repo'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/sources_manager.rb:128:in `update_git_repo'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-core-1.5.2/lib/cocoapods-core/source.rb:344:in `update'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/sources_manager.rb:88:in `block (2 levels) in update'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/user_interface.rb:64:in `section'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/sources_manager.rb:87:in `block in update'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/sources_manager.rb:86:in `each'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/sources_manager.rb:86:in `update'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/command/repo/update.rb:23:in `run'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/claide-1.0.2/lib/claide/command.rb:334:in `run'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/lib/cocoapods/command.rb:52:in `run'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/lib/ruby/gems/2.2.0/gems/cocoapods-1.5.2/bin/pod:55:in `<top (required)>'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/bin/pod:22:in `load'
    /Users/stevepodell/Applications/CocoaPods 2.app/Contents/Resources/bundle/bin/pod:22:in `<main>'
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 

There was a 2018 (outdated) binary at `/usr/local/bin/pod`

which I replaced with 

    lrwxr-xr-x    1 stevepodell  admin        38 May 18 20:44 pod -> /usr/local/lib/ruby/gems/2.7.0/bin/pod

Then same as from the hello test app

      893  pod install
      894  cordova plugin remove cordova-plugin-facebook4
      895  cordova plugin update cordova-plugin-facebook4 --save --variable APP_ID="1097389196952441" --variable APP_NAME="WeVoteCordova"
      896  pod install
      897  cordova build ios
    
      903  sudo gem install cocoapods-dependencies
      904  pod dependencies
      905  pod repo update

### May 19, 2020

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % sudo gem install cocoapods -v1.8.4 
    Fetching cocoapods-1.8.4.gem
    Successfully installed cocoapods-1.8.4
    Parsing documentation for cocoapods-1.8.4
    Installing ri documentation for cocoapods-1.8.4
    Done installing documentation for cocoapods after 1 seconds
    1 gem installed
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % ln -s /usr/local/lib/ruby/gems/2.7.0/bin/pod  /usr/local/bin/pod

Rebuild

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 platforms % cordova platform remove ios
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 platforms % cordova platform add ios   
    Using cordova-fetch for cordova-ios@^5.0.0
    Adding ios project...
    Creating Cordova project for the iOS platform:
            Path: platforms/ios
            Package: org.wevote.cordova
            Name: WeVoteCordova
    iOS project created with cordova-ios@5.1.1
    Installing "cordova-plugin-device" for ios
    Installing "cordova-plugin-facebook4" for ios
    Running command: pod install --verbose
    /usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete
    ...    
    [!] The `WeVoteCordova [Debug]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.debug.xcconfig'. This can lead to problems with the CocoaPods installation
    
    [!] The `WeVoteCordova [Release]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-WeVoteCordova/Pods-WeVoteCordova.release.xcconfig'. This can lead to problems with the CocoaPods installation
    
    Installing "cordova-plugin-inappbrowser" for ios
    Installing "cordova-plugin-keyboard" for ios
    Installing "cordova-plugin-safariviewcontroller" for ios
    Installing "cordova-plugin-screensize" for ios
    Installing "cordova-plugin-splashscreen" for ios
    Installing "cordova-plugin-statusbar" for ios
    Installing "cordova-plugin-whitelist" for ios
    Installing "cordova-plugin-wkwebview-engine" for ios
    Source and destination must not be the same.
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 platforms % cd ios
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 ios % pod dependencies
    
    Calculating dependencies
    
    Dependencies
    - FBSDKCoreKit (5.15.0):
      - FBSDKCoreKit/Basics (= 5.15.0)
      - FBSDKCoreKit/Core (= 5.15.0)
    - FBSDKCoreKit/Basics (5.15.0)
    - FBSDKCoreKit/Core (5.15.0):
      - FBSDKCoreKit/Basics
    - FBSDKLoginKit (5.15.0):
      - FBSDKLoginKit/Login (= 5.15.0)
    - FBSDKLoginKit/Login (5.15.0):
      - FBSDKCoreKit (~> 5.0)
    - FBSDKShareKit (5.15.0):
      - FBSDKShareKit/Share (= 5.15.0)
    - FBSDKShareKit/Share (5.15.0):
      - FBSDKCoreKit (~> 5.0)
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 ios % 

###Up and running 5/20/20, with webapp changes checked in.

The Cordova "app" is still diverged from GIT
* Startup screen in iOS
* Sign in with apple

### June 11, 2020

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-customurlscheme --variable URL_SCHEME=wevotetwitterscheme 
    Installing "cordova-plugin-customurlscheme" for android
    Installing "cordova-plugin-customurlscheme" for ios
    Adding cordova-plugin-customurlscheme to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova list
    Cordova does not know list; try `cordova help` for a list of all the available commands.
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova platform list
    Installed platforms:
      android 8.1.0
      ios 5.1.1
    Available platforms: 
      browser ^6.0.0
      electron ^1.0.0
      osx ^5.0.0
      windows ^7.0.0
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin list
    cordova-plugin-customurlscheme 5.0.1 "Custom URL scheme"
    cordova-plugin-device 2.0.3 "Device"
    cordova-plugin-facebook4 6.4.0 "Facebook Connect"
    cordova-plugin-inappbrowser 3.2.0 "InAppBrowser"
    cordova-plugin-keyboard 1.2.0 "Keyboard"
    cordova-plugin-safariviewcontroller 1.6.0 "SafariViewController"
    cordova-plugin-screensize 1.3.1 "screensize"
    cordova-plugin-sign-in-with-apple 0.0.1 "cordova-plugin-sign-in-with-apple"
    cordova-plugin-splashscreen 5.0.3 "Splashscreen"
    cordova-plugin-statusbar 2.4.3 "StatusBar"
    cordova-plugin-taptic-engine 2.1.0 "Taptic Engine"
    cordova-plugin-whitelist 1.3.4 "Whitelist"
    cordova-plugin-wkwebview-engine 1.2.1 "Cordova WKWebView Engine"
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 

### June 15: Solved the sign in with twitter issue by updating to the lastest release of Cordova ios and tip of master release of inappbrowser 

https://cordova.apache.org/announcements/2020/06/01/cordova-ios-release-6.0.0.html

Need to remove obsolete cordova-plugin-wkwebview-engine

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin remove cordova-plugin-wkwebview-engine
    Uninstalling cordova-plugin-wkwebview-engine from android
    Uninstalling cordova-plugin-wkwebview-engine from ios
    Removing "cordova-plugin-wkwebview-engine"
    Removing plugin cordova-plugin-wkwebview-engine from config.xml file...
    Removing cordova-plugin-wkwebview-engine from package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova platform remove ios
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova platform add ios@6.0.0
    Using cordova-fetch for cordova-ios@6.0.0
    Adding ios project...
    Creating Cordova project for the iOS platform:
            Path: platforms/ios
            Package: org.wevote.cordova
            Name: WeVoteCordova
    iOS project created with cordova-ios@6.0.0
    The preference name "MediaPlaybackRequiresUserAction" has been deprecated. It is recommended to replace this preference with "MediaTypesRequiringUserActionForPlayback."
    Installing "cordova-plugin-customurlscheme" for ios
    Installing "cordova-plugin-device" for ios
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
    Installing "cordova-plugin-inappbrowser" for ios
    Installing "cordova-plugin-keyboard" for ios
    Installing "cordova-plugin-safariviewcontroller" for ios
    Installing "cordova-plugin-screensize" for ios
    Installing "cordova-plugin-sign-in-with-apple" for ios
    Installing "cordova-plugin-splashscreen" for ios
    Installing "cordova-plugin-statusbar" for ios
    Installing "cordova-plugin-taptic-engine" for ios
    Installing "cordova-plugin-whitelist" for ios
    Source and destination must not be the same.
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 

Include latest tip of git for inappbrowser

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 platforms % cordova plugin remove inappbrowser
    Uninstalling cordova-plugin-inappbrowser from android
    Uninstalling cordova-plugin-inappbrowser from ios
    Removing "cordova-plugin-inappbrowser"
    Removing plugin cordova-plugin-inappbrowser from config.xml file...
    Removing cordova-plugin-inappbrowser from package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 platforms % cordova plugin add https://github.com/apache/cordova-plugin-inappbrowser.git
    Installing "cordova-plugin-inappbrowser" for android
    Installing "cordova-plugin-inappbrowser" for ios
    Adding cordova-plugin-inappbrowser to package.json
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 platforms % 

Then rebuild the symlinks

    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % ls -la                                                                            
    total 144
    drwxr-xr-x  10 stevepodell  staff    320 Jun 15 10:21 .
    drwxr-xr-x  18 stevepodell  staff    576 Jun 15 10:11 ..
    lrwxr-xr-x   1 stevepodell  staff     58 Jun 15 10:17 bundle.js -> /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js
    drwxr-xr-x   5 stevepodell  staff    160 Jun 15 10:11 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  66883 Jun 15 10:11 cordova.js
    -rw-r--r--   1 stevepodell  staff   3424 Jun 15 10:14 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     52 Jun 15 10:17 css -> /Users/stevepodell/WebstormProjects/WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     52 Jun 15 10:18 img -> /Users/stevepodell/WebstormProjects/WebApp/build/img
    lrwxr-xr-x   1 stevepodell  staff     64 Jun 15 10:21 index.html -> /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html
    drwxr-xr-x  13 stevepodell  staff    416 Jun 15 10:14 plugins
    stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 www % 

Twitter works!
