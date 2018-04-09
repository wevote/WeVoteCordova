# The WeVoteCordova app for iOS and Android

Apache Cordova allows one to take their pre-existing JavaScript WebApp, bundle it with some additional Cordova JavaScript
and native code, and build an app for iOS or Android that can be released as an app in the App Store or Play Store.  Cordova
works perfectly well with React apps.

For a very simple app, you literally just drop it into Cordova and go, for more complex apps (like ours) there are some
changes to be made.  See [Cordova JavaScript Differences](docs/Cordova%20JavaScript%20Differences.md).

We use a very thin Apache Cordova wrapper to encapsulate the We Vote React WebApp.  The WeVoteCordova side is so thin, that
all it contains is Apache Cordova, some Documentation, and the iOS and Android config (and possibly a small amount of 
native code).  All of the JavaScript and React code, and the libraries that they rely on, remains in the WeVote WebApp.

Two target builds are planned for this Cordova app project: one for iOS and one for Android.


## Installing the app:

Clone or download the WeVoteCordova app into a directory that parallels the We Vote WeApp directory on your computer.  Steve put his in
`/Users/stevepodell/WebstormProjects/WeVoteCordova` with his WebApp in `/Users/stevepodell/WebstormProjects/WebApp`, but 
you can put them where you like, but you will have to adapt the paths in these instructions for your setup.

Install Apple Xcode from the MacOS App Store, you will need a Mac for the iOS part of this project, and a Mac will also be
fine for Android development.  For Android, install the [Android Studio](https://developer.android.com/studio/index.html)
(a free JetBrains based IDE, from the makers of PyCharm, WebStorm, etc.)

### Install Xcode

The easiest way to install Xcode is via the
<a href="https://itunes.apple.com/us/app/xcode/id497799835?mt=12" target="_blank">Mac App Store.</a>  The Xcode.app download is 10gb in size.

### Node, Watchman, React Native command line interface

We recommend installing node and watchman via Homebrew.

    brew install node
    brew install watchman

Node comes with npm, which lets you install the React Native command line interface.

    npm install -g react-native-cli

If you get a permission error, try with sudo: `sudo npm install -g react-native-cli`.

### iOS specific IDE and Environment setup


Be sure to open **`/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcworkspace`** each time, if
you forget the compile will fail, since you won't have referenced the cocopods (a dependency manger, that pulls in some iOS
specific libraries.)

Be sure to NOT open ~~`/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcodeproj`~~ with Xcode,
and don't pick one out of the history in the Welcome to Xcode dialog.  The history unfortunately only contains contains
references to .xcodeproj files.

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Welcome%20To%20Xcode.png" alt="alt text" width="600" >

And in the "Welcome to Xcode" dialog, don't pick anything from the history list (those are all xcodeproj files), you have to
click "Open another project..." and navigate to the 'WeVoteReactNative.xcworkspace' item (which is actually a directory).


**Clean Build:**

You probably will run into the need to "Clean Build Folder".  To do this in XCode, go to the Product menu, hold down the Option button
(on your Mac) and select "Clean Build Folder", after it completes (about 10 seconds), press the triangular
Run (Play) button do to a full rebuild

## Initial install of tour code from github

You may need to install Gradle, a Java build tool for the Android side.  `npm install gradle`

Before you can run WeVoteCordova, you will need to have the We Vote WebApp built first.  Even the setup of WeVoteCordova requires the We Vote WebApp
to have been successfully run since WeVoteCordova relies on the `bundle.js` that is the 'compiled' resultof the React WebApp build.

Cordova and our WeVoteCordova wants to load the `bundle.js` from a www directory, that (on Steve's Mac) is at `/Users/stevepodell/WebstormProjects/WeVoteCordova/www`
and in order to make the setup easy to understand, there is now a www directory in the WebApp at `/Users/stevepodell/WebstormProjects/WebApp/www`
These two www directories are joined together with [symlinks/Symbolic links](https://en.wikipedia.org/wiki/Symbolic_link)

## Install steps iOS

1. cd /Users/stevepodell/WebstormProjects
1. git clone https://github.com/wevote/WeVoteCordova.git, then cd to WeVoteCordova
    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:WebstormProjects stevepodell$ git clone https://github.com/wevote/WeVoteCordova.git
    Cloning into 'WeVoteCordova'...
    remote: Counting objects: 811, done.
    remote: Compressing objects: 100% (245/245), done.
    remote: Total 811 (delta 208), reused 284 (delta 130), pack-reused 425
    Receiving objects: 100% (811/811), 32.13 MiB | 9.91 MiB/s, done.
    Resolving deltas: 100% (321/321), done.
    (WebAppEnv)Steves-MacBook-Pro-2017:WebstormProjects stevepodell$ cd WeVoteCordova
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ ls -la
    total 176
    drwxr-xr-x  14 stevepodell  staff    448 Apr  8 11:12 .
    drwxr-xr-x  48 stevepodell  staff   1536 Apr  8 11:12 ..
    drwxr-xr-x  13 stevepodell  staff    416 Apr  8 11:12 .git
    -rw-r--r--   1 stevepodell  staff   4262 Apr  8 11:12 .gitignore
    drwxr-xr-x   3 stevepodell  staff     96 Apr  8 11:12 .idea
    -rw-r--r--   1 stevepodell  staff     17 Apr  8 11:12 .npmignore
    -rw-r--r--   1 stevepodell  staff  31121 Apr  8 11:12 README.md
    -rw-r--r--   1 stevepodell  staff   3771 Apr  8 11:12 config.xml
    drwxr-xr-x   6 stevepodell  staff    192 Apr  8 11:12 docs
    -rw-r--r--   1 stevepodell  staff  36516 Apr  8 11:12 package-lock.json
    -rw-r--r--   1 stevepodell  staff   1343 Apr  8 11:12 package.json
    drwxr-xr-x   4 stevepodell  staff    128 Apr  8 11:12 platforms
    drwxr-xr-x   5 stevepodell  staff    160 Apr  8 11:12 res
    drwxr-xr-x   3 stevepodell  staff     96 Apr  8 11:12 src
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$
    ```
1. make the www dir, and symlink bundle.js
    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ mkdir www
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ cd www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 0
    drwxr-xr-x   3 stevepodell  staff   96 Apr  8 11:18 .
    drwxr-xr-x  16 stevepodell  staff  512 Apr  8 14:56 ..
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js bundle.js
    ```
1. Create a scaffolding setup for iOS and Android (that will be partially replaced a few steps down this proceedure).
    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ cd ..
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ cordova platform rm ios android
    Removing platform ios from config.xml file...
    Removing platform android from config.xml file...
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ cordova platform add ios android
    Using cordova-fetch for cordova-ios@~4.5.4
    Adding ios project...
    Creating Cordova project for the iOS platform:
        Path: platforms/ios
        Package: org.wevote.cordova
        Name: WeVoteCordova
    iOS project created with cordova-ios@4.5.4
    Discovered plugin "cordova-plugin-device" in config.xml. Adding it to the project
    Installing "cordova-plugin-device" for ios
    Adding cordova-plugin-device to package.json
    Saved plugin info for "cordova-plugin-device" to config.xml
    Discovered plugin "cordova-plugin-statusbar" in config.xml. Adding it to the project
    Installing "cordova-plugin-statusbar" for ios
    Adding cordova-plugin-statusbar to package.json
    Saved plugin info for "cordova-plugin-statusbar" to config.xml
    Discovered plugin "cordova-plugin-keyboard" in config.xml. Adding it to the project
    Installing "cordova-plugin-keyboard" for ios
    Adding cordova-plugin-keyboard to package.json
    Saved plugin info for "cordova-plugin-keyboard" to config.xml
    Discovered plugin "cordova-plugin-safariviewcontroller" in config.xml. Adding it to the project
    Installing "cordova-plugin-safariviewcontroller" for ios
    Adding cordova-plugin-safariviewcontroller to package.json
    Saved plugin info for "cordova-plugin-safariviewcontroller" to config.xml
    Discovered plugin "cordova-plugin-splashscreen" in config.xml. Adding it to the project
    Installing "cordova-plugin-splashscreen" for ios
    Adding cordova-plugin-splashscreen to package.json
    Saved plugin info for "cordova-plugin-splashscreen" to config.xml
    Discovered plugin "cordova-plugin-inappbrowser" in config.xml. Adding it to the project
    Installing "cordova-plugin-inappbrowser" for ios
    Adding cordova-plugin-inappbrowser to package.json
    Saved plugin info for "cordova-plugin-inappbrowser" to config.xml
    Discovered plugin "cordova-plugin-whitelist" in config.xml. Adding it to the project
    Installing "cordova-plugin-whitelist" for ios
    Adding cordova-plugin-whitelist to package.json
    Saved plugin info for "cordova-plugin-whitelist" to config.xml
    --save flag or autosave detected
    Saving ios@~4.5.4 into config.xml file ...
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
    Installing "cordova-plugin-device" for android
    Installing "cordova-plugin-inappbrowser" for android
    Installing "cordova-plugin-keyboard" for android
    Installing "cordova-plugin-safariviewcontroller" for android
    Subproject Path: CordovaLib
    Subproject Path: app
    Installing "cordova-plugin-splashscreen" for android
    Installing "cordova-plugin-statusbar" for android
    Installing "cordova-plugin-whitelist" for android
                   This plugin is only applicable for versions of cordova-android greater than 4.0. If you have a previous platform version, you do *not* need this plugin since the whitelist will be built in.

    --save flag or autosave detected
    Saving android@~7.0.0 into config.xml file ...
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$
    ```
1. Note that the `cordova platform add`, added seven plugins for Android and seven plugins for iOS.
1. Now overwrite any scaffolding files that overwrote version controlled files
    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ git fetch --all
    Fetching origin
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ git reset -- hard origin/master
    Unstaged changes after reset:
    M	config.xml
    M	package-lock.json
    M	package.json
    M	platforms/android/android.json
    M	platforms/android/build.gradle
    M	platforms/android/cordova-plugin-safariviewcontroller/cordova-SafariViewController-java18.gradle
    ...
    M	platforms/ios/WeVoteCordova/WeVoteCordova-Info.plist
    M	platforms/ios/WeVoteCordova/config.xml
    M	platforms/ios/ios.json
    M	platforms/ios/platform_www/cordova_plugins.js
    D	platforms/ios/www/index.html
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$
    ```
1. Save off the ios www directory and symlink www to `WeVoteCordova/www`
    ```
      550  cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios
      551  ls -la
      552  mv www SAVEOFF_www
      554  ln -s ../../../StevesForkOfWebApp/www www
    ```
1. Overwrite the `WeVoteCordova-Info.plist` (most of the Xcode project configuration menu data)
    ```
      580  cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova
      586  rm WeVoteCordova-Info.plist
      588  curl 'https://github.com/wevote/WeVoteCordova/blob/f3d1d4601f0bc3519e6d331a838ebcddbac151e6/platforms/ios/WeVoteCordova/WeVoteCordova-Info.plist' > WeVoteCordova-Info.plist
    ```

## April 8, 2018 From Scratch continued for Android
1. Install Android Studio
1. Open the Android platform code at ~ WebstormProjects/WeVoteCordova/platforms/android
1. Add in the "Phonegap/Cordova Plugin" see the [Medium Article](https://medium.com/@gotoark/how-to-run-cordova-projects-in-android-studio-8f41bdf52be3)
1. In Android Studio, Sync the Gradle build system via File/"Sync Project With Gradle Files"
1. Note the failure with the error "Could not find method jackOptions() for arguments [cordova_SafariViewController_j_7x7dqth91wctoep6z6y94lpt9$_run_closure1$_closure2$_closure3$_closure5@22df17fe] on DefaultConfig_Decorated{name=main, dimension=null, ... mWearAppUnbundled=null} of type com.android.build.gradle.internal.dsl.DefaultConfig."
Open the file `WeVoteCordova/platforms/android/cordova-plugin-safariviewcontroller/cordova-SafariViewController-java18.gradle` and comment out the jackOptions section of the file (jackOptions are obsolete).
```
    ext.postBuildExtras = {
        android {
            defaultConfig {
    //            jackOptions {
    //                enabled true
    //                additionalParameters('jack.incremental': 'true')
    //            }
            }
            compileOptions {
                sourceCompatibility JavaVersion.VERSION_1_8
                targetCompatibility JavaVersion.VERSION_1_8
            }
        }
    }
```
1. Note that andorid synced successfuly with one warning that 'compile is obsolete' -- no worries about the warning.
## Creating all the Symlinks

These instructions are based on the following two home project directories...  

```
    /Users/stevepodell/WebstormProjects/WeVoteCordova
    /Users/stevepodell/WebstormProjects/WebApp
```

Your directories will have different names, so you will have to adapt your symlink commands to your structure

1. Create a symbolic Link so that WeVoteCordova project sees the WebApp projects's www directory as its own www directory

    ```
    cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios
    mv www SAVEOFF_www
    ln -s ../../../WebApp/www www
    ```
    
1. After creating this link, the `WeVoteCordova/platforms/ios` directory should look like this... 

    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ ls -la
    total 48
    drwxr-xr-x  15 stevepodell  staff   480 Apr  6 12:46 .
    drwxr-xr-x   5 stevepodell  staff   160 Apr  6 12:38 ..
    -rw-r--r--   1 stevepodell  staff    53 Apr  6 12:38 .gitignore
    drwxr-xr-x   7 stevepodell  staff   224 Apr  6 12:38 CordovaLib
    drwxr-xr-x  12 stevepodell  staff   384 Apr  6 12:38 SAVEOFF_www
    drwxr-xr-x  14 stevepodell  staff   448 Apr  6 12:38 WeVoteCordova
    drwxr-xr-x   4 stevepodell  staff   128 Apr  6 12:38 WeVoteCordova.xcodeproj
    drwxr-xr-x   5 stevepodell  staff   160 Apr  6 12:39 WeVoteCordova.xcworkspace
    drwxr-xr-x  26 stevepodell  staff   832 Apr  6 12:38 cordova
    -rw-r--r--   1 stevepodell  staff    56 Apr  6 12:38 frameworks.json
    -rw-r--r--   1 stevepodell  staff  4117 Apr  6 12:38 ios.json
    drwxr-xr-x   6 stevepodell  staff   192 Apr  6 12:38 platform_www
    -rw-r--r--   1 stevepodell  staff   860 Apr  6 12:38 pods-debug.xcconfig
    -rw-r--r--   1 stevepodell  staff   859 Apr  6 12:38 pods-release.xcconfig
    lrwxr-xr-x   1 stevepodell  staff    19 Apr  6 12:46 www -> ../../../WebApp/www
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$
    ```

1. Then create a group of symlinks so that the WebApp project's www directory sees various subdirectories in the pre-existing WebApp project's directory 
structure, and certain subdirectories in WeVoteCordova as if they were in the WebApp project's www directory.
   ```
    cd /Users/stevepodell/WebstormProjects/WebApp/www
    ln -s ../build/js/bundle.js bundle.js 
    ln -s ../../WeVoteCordova/platforms/ios/platform_www/cordova.js cordova.js
    ln -s ../build/css css
    ln -s ../build/fonts fonts
    ln -s ../build/img img
    ln -s ../build/javascript javascript
    ```
    
1. After creating all those links, the `WebApp/www` directory should look like this... 

    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 56
    drwxr-xr-x  14 stevepodell  staff   448 Apr  6 12:36 .
    drwxr-xr-x  32 stevepodell  staff  1024 Apr  6 11:08 ..
    -rw-r--r--   1 stevepodell  staff  6148 Mar 20 15:17 .DS_Store
    lrwxr-xr-x   1 stevepodell  staff    73 Apr  2 20:55 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    drwxr-xr-x   5 stevepodell  staff   160 Mar 23 10:14 cordova-js-src
    lrwxr-xr-x   1 stevepodell  staff    57 Mar 18 12:32 cordova.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova.js
    -rw-r--r--   1 stevepodell  staff  1845 Apr  6 12:36 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    12 Mar 18 12:08 css -> ../build/css
    lrwxr-xr-x   1 stevepodell  staff    14 Mar 18 12:37 fonts -> ../build/fonts
    lrwxr-xr-x   1 stevepodell  staff    12 Mar 21 13:54 img -> ../build/img
    -rw-r--r--   1 stevepodell  staff  5754 Apr  6 12:07 index.html
    lrwxr-xr-x   1 stevepodell  staff    19 Mar 18 12:40 javascript -> ../build/javascript
    drwxr-xr-x   8 stevepodell  staff   256 Apr  6 12:04 plugins
    -rw-r--r--   1 stevepodell  staff  5046 Mar 21 14:06 saveOffMarch21-206pm-index.html
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$
    ```

Once you have setup the symlinks, you can compile all the React in your WebApp setup as before, which creates a `bundle.js` 
file.  Then in the cordova project, you might not need to do anything.  Using the Xcode compiler will start up your Cordova 
project which contains the `bundle.js` and run it in a simulator, or on a phone attached with a USB cable.

## Opening the project in Xcode

This is very similar to the way we do it with the WeVoteReactNative iOS development.  
  
Download Xcode from the MacOS App Store, and launch it:

Don't use the last opened list, instead click on "Open another project..." (We use an Apple specific packager
called CocoaPods, which forces us to ignore that handy last opened menu.)

![ScreenShot](docs/images/WelcomeToXcode.png)

After clicking the "Open another project..." button, select the `WeVoteCordova.xcworkspace` file and press Open.

![ScreenShot](docs/images/WeVoteCordova.xcworkspace.png)


Select a simulator type from the menu on top (I use iPhone 8p in this example), then press the triangular green play button,
and the app starts in the simulator.

### Updating the art for the Splashscreen


In order to handle the 12" iPad Pro I took the image supplied into Photoshop, resized it to 2732x2732, forced it to have no 
transparent pixels, and renamed it to the required(?) name `Default@2x~universal~anyany.png`.  Then (not being an Xcode expert), 
I dropped the image **within the Xcode program** into `WeVoteCordova/Resources//Images.xcassets/LaunchImage` into each 
location in the universal section.

<img width="1569" alt="screen shot 2018-03-23 at 8 44 35 am" src="https://user-images.githubusercontent.com/6923653/37838985-931e356c-2e76-11e8-8473-a1c18b31d87d.png">

This resulted in these files being created:

```
(WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ ls -la ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/*
-rw-r--r--  1 stevepodell  staff    3765 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Contents.json
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-1.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-10.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-11.png
-rw-r--r--@ 1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-2.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-3.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-4.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-5.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-6.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-7.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-8.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:27 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany-9.png
-rw-r--r--  1 stevepodell  staff  134330 Mar 22 08:26 ./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany.png
(WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ 
```

So to replace the splash screen, I would take `./WeVoteCordova/Images.xcassets/LaunchStoryboard.imageset/Default@2x~universal~anyany.png` and 
replace it with same sized art, and if you wanted to  be safe I would use Xcode to copy them (and automatically rename them) 
over the existing files, if you were feeling adventurous you could go directly to the files, and take the new image and 
use it to replace the original and the 12 numbered copies of the old image.

By the way there are many vestigial images in the xcode dir that I have no idea if they are needed or not, but messing up 
Xcode (which stores too much configuration info in a binary file), can take days to fix, so I am leaving the old unneeded files in place.


## Debugging Cordova Apps with the Safari debugger

![ScreenShot](docs/images/SafariDevelopMenu.png) 

You don't have to actually use Safari for Mac for anything, but launching its remote debugger.  You can see it opened on its
smallest default page in the picture above, it just has to be running so you can get to that "Develop" menu.  Once you
open the "We Vote Cordova" page that is currently being displayed, in the piture it is the "Welcome to We Vote" page. 

![ScreenShot](docs/images/SafariSimulatorRunning.png)

It is easy to get the Safari debugger working, but it is missing lots of features that we are used to from the
Chrome Devtools Debugger.


1. Enable debugging in Safari, [see this article](http://geeklearning.io/apache-cordova-and-remote-debugging-on-ios/)
1. Build your 'compiled' javascript app file `bundle.js`, on my Mac it is at `build/js/bundle.js`.  This file needs to be symlinked
into your www directory (see the section on symlinks above).
    1. On my Mac in WebStorm, I have a Gulp task that has a target "build", when I press the play button for that task, it builds the
bundle.js in 20 seconds (Two seconds to gather all the js scripts together, and 18 seconds to recompile sass).
1. Press the play button in Xcode, which should start the Simulator, load, and then start the WeVote WebApp.
1. In Safari open Develop/Simulator/WeVoteCordova/WeVote and the Safari Web Inspector appears.

## Debugging Cordova Apps with the Chrome dev tools

Chrome devtools is lightyears better than the Safari debugger, but is a bit challenging to get working. See ...

[medium.com article about the remotedebug-ios-webkit-adapter for debugging WebViews](https://medium.com/@auchenberg/hello-remotedebug-ios-webkit-adapter-debug-safari-and-ios-webviews-from-anywhere-2a8553df7465)

[github.com readme about remotedebug-ios-webkit-adapter#getting-started](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter#getting-started)

Install the remotedebug_ios_webkit_adapter (from a terminal window):

```
  brew update
  brew install --HEAD libimobiledevice
  brew install --HEAD ios-webkit-debug-proxy
  npm install remotedebug-ios-webkit-adapter -g
```

Run the remotedebug_ios_webkit_adapter:

```
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ remotedebug_ios_webkit_adapter --port=9000
    remotedebug-ios-webkit-adapter is listening on port 9000
    iosAdapter.getTargets
    iosAdapter.getTargets
    iosAdapter.getTargets
    ...
```

You may have to restart the remotedebug_ios_webkit_adapter from time to time, to get the
`chrome://inspect/#devices` to see the simulator processes.

After starting the remotedebug_ios_webkit_adapter (hopefully on the first attempt) when you navigate in the Google Chrome
browser to `chrome://inspect` you will see the following screen, with the process to debug on the
list below:

![ScreenShot](docs/images/ChromeInspect.png)
  
Press that little blue 'inspect' to open the debugger, which should look like the following:

![ScreenShot](docs/images/ChromeInspectWDebuggerShowing.png)


If `chrome://inspect` doesn't list your target, then try restarting remotedebug_ios_webkit_adapter and maybe restarting
your Cordova app via Xcode.  This is imperfect, but not too bad once you get the hang of it.

Unfortunately in both the Apple and Chrome debuggers, breakpoints are not maintained between restarts
of the app via Xcode, and also the files where you want to put the breakpoints have to be reopened each time.  (This deficiency
is not the case in React-Native, so hopefully a fix will arrive some day.)

Press ⌘+P to bring up the list of recently opened files -- this can save you a bunch of clicks.

In spite of the previous problem, it is possible to debug a startup behaviour, one that would fly past before you could set the first 
breakpoint -- on the upper left  corner of the chrome debugger, there is a "circular arrow, 
reload button" (see the following image) that will allow you to restart the app within the Chrome Inspector while maintaining
the current breakpoints.

![ScreenShot](docs/images/ChromeCircularReloadButton.png)


## WebApp code changes needed to support Cordova

In Apache Cordova, all the real app code is in that `bundle.js` we make in the WebApp setup, but there are some code
changes in the WebApp that are necessary to support cordova.

[Cordova JavaScript Differences](docs/Cordova%20JavaScript%20Differences.md).

### Strange rules for the www directory

If you follow the logic of the www directory, the Cordova app "thinks the directory is at `WeVoteCordova/platforms/ios//www`,
but symlinks put it in `/WebApp/www`, then symlinks on the WebApp www directory reference back to some
directories in WeVoteCordova.

Installation of Cordova plugins (packages of javascript and objective c that provide a feature to 
Cordova apps), put some files in www.  Without creating new symlinks for every instance of this, and 
every future instance, it seems simpler for all concerned to leave those files in the WebApp and to source
control them in the WebApp.  Some of these files are source from other packages, and will be overwritten
when the Cordova side is upgraded.  This seems strange, but should cause the least confusion for people working
on the WeVoteCordova project.

The index.html for WeVoteCordova, has been source controlled at `/WebApp/www/index.html`.  Due to symlinks it
will also appear to be in WeVoteCordova, but it is in `.gitignore` for WeVoteCordova so please do not attempt
to add it to git in WeVoteCordova, or there will be two competing versions of this file that would
overwrite each other.


## Testing from a physical phone with the API server running on your Mac

If you are developing a Cordova specific feature, that requires access to the API server
running on your Mac, while not using the simulator, some extra setup is required to allow
access to your Mac's localhost.

[Testing with a Physical Phone and a localhost WeVote API Server](docs/TestingWithLocalHostFromPhone.md)


## Git

Unfortunately (2/15/18) the github repository we work against is not 'develop', so the pull request to
update your local 'develop' is different.
```
    git pull wevote-master master
    git push origin develop
```

otherwise all else in our github workflow is the same.

## Making an iOS release

1. After testing,and making your React changes in the WebApp, check in those changes and prepare (ideally) to build from a fully 
up-to-date WebApp develop.

1. Your WebApp config.js, should look like this:
    ```
    module.exports = {
      WE_VOTE_URL_PROTOCOL: "https://",  // "http://" for local dev or "https://" for live server
      WE_VOTE_HOSTNAME: ""WeVote.US",  // This should be without "http...". This is "WeVote.US" on live server.
    
      WE_VOTE_SERVER_ROOT_URL: "https://api.wevoteusa.org/",
      WE_VOTE_SERVER_ADMIN_ROOT_URL: "https://api.wevoteusa.org/admin/",
      WE_VOTE_SERVER_API_ROOT_URL: "https://api.wevoteusa.org/apis/v1/",
    
      DEBUG_MODE: false,
    
      // Use 1 or 0 as opposed to true or false
      test: {
        use_test_election: 0,
      },
    
      location: {
        text_for_map_search: "",
      },
    
      FACEBOOK_APP_ID: "<the actual number that you got from Dale>",
    
      STRIPE_API_KEY: "<the production 'pk_live_...' api key from Dale.  NOT the test 'pk_test_...'>",
    
      IS_CORDOVA: false,
    };
    ```

    That `IS_CORDOVA` value has been abandoned, and does not need to be changed.
    
    Be sure to double check that you are using these production config values, it
    would be difficult (but possible) to detect a misconfiguration while testing.

1. Run a gulp task, or otherwise build the WebApp `bundle.js`

2. On WeVoteCordova side,on the Target General Properties tab, increment the 
build number by one.  For example build 3, becomes Build 4.

    ![ScreenShot](docs/images/Xcode General Properties.png)
    
    This may be the only change that gets made in the WeVoteCordova repository,
    but it is important to check it in so that we have a record of how each build was
    made.  When you do check it it, please include a reference to the WebApp
    Git commit that resulted in the `bundle.js`

3. Before checking in WeVoteCordova, test on a simulator for both an iPhone and iPad.

4. Build a release candidate in Xcode 

   * You will need a physical iPhone plugged into your computer via a USB cable (It is possible that an iPad or iPod touch would work for this purpose.)
   * The phone will have to be registered with Apple inorder for Xcode to sign the app.
   * Then build the release candidate in Xcode via Product/Archive
   * Then follow the options to upload the candidate to "the App Store" via [https://itunesconnect.apple.com/](https://itunesconnect.apple.com/)  Dale can make you
an account on itunesconnect

      * Allow "Upload your app's symbols...
      * Automatically manage signing
      * Upload

   * After upload, it could take a half hour for the build to appear on itunes connect, and then
the build could be "Processing" for another half hour.  (Due to an ancient tech WebObjects
page, refreshing the page could make the "processing" build disappear, but it
is still processing, and will reappear when done.  And sadly, the WebObjects page does not update itself when
done, so you will have to refresh to confirm that it is done processing, and probably shows "Missing Compliance"
as its status.)

    ![ScreenShot](docs/images/iTunesConnectProcessing.png)
    iTunes Connect Processing

5.  Wait for the build to appear
When processing is done, the build will be in the "Missing Compliance" state, clikc on the build number link, 
to "Provide Export Compliance Information"  Click on the "Provide Export Compliance Information" button

   * Have you added or made changes to encryption features since your last submission of this app? **NO**
   * Proceed to "Start Internal Testing"

6. Test in TestFlight
    After compliance is done, and you have proceeded to internal testing, it take can a minute to an hour for the app build
    to be available on the "iOS Builds" list in TestFlight.  Then a minute to an hour for the app to be available to test
    on your iPhone via the TestFlight app.

    ![ScreenShot](docs/images/TestFlightAppBordered.jpg)  

7. Finally submit for review in iTunesConnect
    Submit it for TestFlight
    
    Test it on TestFlight (the app might rejected if Apple does not see any
    evidence of testing, ideally by multiple users).

8.  Once testing is complete, submit it for "Review"

## If the cordova plugins are not installed

These should be installed by Git, but if not you might see error "-1100" lines in the log.

In WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js

```
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-device": "2.0.1",
      "cordova-plugin-statusbar": "2.4.1",
      "cordova-plugin-keyboard": "1.2.0",
      "cordova-plugin-safariviewcontroller": "1.5.2",
      "cordova-plugin-whitelist": "1.3.3",
      "cordova-plugin-inappbrowser": "2.0.2",
      "cordova-plugin-splashscreen": "5.0.2"
    };
```

If they are not present, the commands to install them (from the WeVoteCordova dir) are:

```
  cordova plugin add cordova-plugin-whitelist
  cordova plugin add cordova-plugin-device
  cordova plugin add cordova-plugin-statusbar
  cordova plugin add cordova-plugin-keyboard
  cordova plugin add cordova-plugin-splashscreen
  cordova plugin add cordova-plugin-safariviewcontroller
  cordova plugin add https://github.com/apache/cordova-plugin-inappbrowser/pull/263

```

Note:  Sometimes the setup needs to be re-run
```
  554  cordova platform remove android
  555  cordova platform add android
```

If you do this, your changes to ```WeVoteCordova/platforms/android/cordova-plugin-safariviewcontroller/cordova-SafariViewController-java18.gradle```
and to ```WeVoteCordova/platforms/android/app/src/main/java/org/apache/cordova/inappbrowser/InAppBrowser.java``` will have to be redone.

For getting the "Run" configuration to work again, you may have select on the file menu "Sync Project With Gradle Files"

## Android Setup

### Install Android Studio

It's free!  It is based on Intellij, so if you have used PyCharm, WebStorm, RubyMine, or IntelliJ it should be instantly familar.

[https://developer.android.com/studio/index.html](https://developer.android.com/studio/index.html)
    
TODO: On a clean machine, capture all the steps it takes to get Android Studio
going, and the Java environment setup.  The Android and [Cordova](https://cordova.apache.org/docs/en/latest/) documentation are a good
start.


### Modify Build Configuration

1.  As of March 29, 2018, if you get a project compile error in AndroidStudio ```Could not find method jackOptions() for arguments [cordova_SafariViewController_...```
you might have to remove the jack settings in ```WeVoteCordova/platforms/android/cordova-plugin-safariviewcontroller/cordova-SafariViewController-java18.gradle```
this file is not source controlled by We Vote. See "Migrate from Jack" at https://developer.android.com/studio/write/java8-support.html.

    ```
    ext.postBuildExtras = {
        android {
            defaultConfig {
    //            jackOptions {
    //                enabled true
    //                additionalParameters('jack.incremental': 'true')
    //            }
            }
            compileOptions {
                sourceCompatibility JavaVersion.VERSION_1_8
                targetCompatibility JavaVersion.VERSION_1_8
            }
        }
    }
    ```

2. The We Vote project has made a pull request against the cordova core plugin cordova-plugin-inappbrowser, which we need
to allow our oAuth flow for Twitter and Facebook to work.

See [https://github.com/SailingSteve/cordova-plugin-inappbrowser](https://github.com/SailingSteve/cordova-plugin-inappbrowser)


### Modify platform_www Directory

1. Change directory to the android platform directory within the WeVoteCordova project

```
    Steves-MacBook-Pro-2017:android stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android
    Steves-MacBook-Pro-2017:android stevepodell$

```
1. Rename the platform_www to SAVEOFF_platform_www

```
    Steves-MacBook-Pro-2017:android stevepodell$ ls platform_www
    cordova-js-src          cordova.js              cordova_plugins.js      plugins
    Steves-MacBook-Pro-2017:android stevepodell$ mv platform_www/ SAVEOFF_platform_www
    Steves-MacBook-Pro-2017:android stevepodell$ 
```

1. Create a symlink to the www directory (that you created in the iOS setup above) from the prior location
of the platform_www directory

```
    Steves-MacBook-Pro-2017:android stevepodell$ ln -s ../../www/ platform_www
    Steves-MacBook-Pro-2017:android stevepodell$ ls -la ./platform_www/
    total 16
    drwxr-xr-x  11 stevepodell  staff   352 Apr  2 20:56 .
    drwxr-xr-x  20 stevepodell  staff   640 Apr  5 11:08 ..
    -rw-r--r--@  1 stevepodell  staff  6148 Apr  5 09:49 .DS_Store
    lrwxr-xr-x   1 stevepodell  staff    73 Apr  2 20:56 bundle.js -> /Users/stevepodell/WebstormProjects/WebApp/build/js/bundle.js
    lrwxr-xr-x   1 stevepodell  staff    40 Mar 18 11:17 cordova.js -> ../platforms/ios/platform_www/cordova.js
    lrwxr-xr-x   1 stevepodell  staff    48 Mar 18 11:38 cordova_plugins.js -> ../platforms/ios/platform_www/cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    34 Mar 18 11:33 css -> ../../WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff    36 Mar 18 11:44 fonts -> ../../WebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff    39 Mar 29 13:16 index.html -> ../../WebApp/www/index.html
    lrwxr-xr-x   1 stevepodell  staff    41 Mar 18 11:35 javascript -> ../../WebApp/build/javascript
    drwxr-xr-x   4 stevepodell  staff   128 Apr  5 09:42 plugins
    Steves-MacBook-Pro-2017:android stevepodell$
```

1. Create another symlink to the www directory from the assets www directory (an attempt to run or
build (within Android Studio) might be required to create this directory)

```
    Steves-MacBook-Pro-2017:android stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/app/src/main/assets
    Steves-MacBook-Pro-2017:assets stevepodell$ ls
    www
    Steves-MacBook-Pro-2017:assets stevepodell$ mv www SAVEOFF_www
    Steves-MacBook-Pro-2017:assets stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/www www
```


1. Check for a symlink for index.html

```
    Steves-MacBook-Pro-2017:www stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/www
    Steves-MacBook-Pro-2017:www stevepodell$ ln -s ../../WebApp/www/index.html index.html
    Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 16
    drwxr-xr-x  10 stevepodell  staff   320 Mar 29 13:16 .
    drwxr-xr-x  20 stevepodell  staff   640 Mar 29 13:06 ..
    -rw-r--r--@  1 stevepodell  staff  6148 Mar 18 16:49 .DS_Store
    lrwxr-xr-x   1 stevepodell  staff    43 Mar 18 11:30 bundle.js -> ../../WebApp/build/js/bundle.js
    lrwxr-xr-x   1 stevepodell  staff    40 Mar 18 11:17 cordova.js -> ../platforms/ios/platform_www/cordova.js
    lrwxr-xr-x   1 stevepodell  staff    48 Mar 18 11:38 cordova_plugins.js -> ../platforms/ios/platform_www/cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    34 Mar 18 11:33 css -> ../../WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff    36 Mar 18 11:44 fonts -> ../../WebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff    39 Mar 29 13:16 index.html -> ../../WebApp/www/index.html
    lrwxr-xr-x   1 stevepodell  staff    41 Mar 18 11:35 javascript -> ../../WebApp/build/javascript
    Steves-MacBook-Pro-2017:www stevepodell$
```
    if there is no symlink for index.html, do the following...

```
    Steves-MacBook-Pro-2017:www stevepodell$ ls /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    bundle.js               cordova-js-src          cordova.js              cordova_plugins.js      css                     fonts                   javascript              plugins
    Steves-MacBook-Pro-2017:www stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    Steves-MacBook-Pro-2017:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/WebApp/www/index.html index.html
    Steves-MacBook-Pro-2017:www stevepodell$ 
```

### Running Android Cordova for the first time

![ScreenShot](docs/images/AndoridEditConfigNoAndroidSDK.png)
![ScreenShot](docs/images/AndroidSDKSetup.png)


### Debugging Android Cordova

Just like iOS!  Use the [chrome://inspect/#devices](chrome://inspect/#devices) in Chrome, but no need to start the 
remotedebug_ios_webkit_adapter server, something in Android or Android Studio has done that for us automatically.

### If things go wrong with Android plugin setup

Wipeout the android directory, and recreate it (with freshly installed plugins and configuration):

 ```
 cordova platform remove android
 cordova platform add android
 ```

 redo the plugins symlink

 ```
 cd /Users/stevepodell/WebstormProjects/WeVoteCordova/www
 ln -s ../../WebApp/www/plugins/ plugins
 ```

 redo the www and platforms_www symlinks


### If the Twitter Redirect stops working in iOS

Make sure the custom scheme URL Type is still setup in Xcode

![ScreenShot](docs/images/SettingUpTheIosCustomScheme.png)

### iOS has two config.xml -- make sure you change both

I think that when you (DON'T DO THIS)
```
    cordova platform remove ios
    cordova platform add ios
```
you regenerate the iOS specific `config.xml` (platforms/ios/WeVoteCordova/config.xml), that does not have config that is
in android specific blocks in the "root" config.xml.  At run time the only config.xml that matters for iOS is `platforms/ios/WeVoteCordova/config.xml`, so
be sure to manually make the changes in both places (yuck).  If you make the mistake of removing platform for iOS, you will lose
the entire directory for iOS including any configuration you made in XCode -- it might take you a lot of time to recover from
this.