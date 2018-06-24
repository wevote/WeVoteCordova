# The WeVoteCordova app for iOS and Android

Apache Cordova allows one to take their pre-existing JavaScript WebApp, bundle it with some additional Cordova JavaScript
and native code, and build an app for iOS or Android that can be released as an app in the App Store or Play Store.  Cordova
works perfectly well with React apps.

For a very simple app, you literally just drop it into Cordova and go, for more complex apps (like ours) there are some
changes to be made.  See [Cordova JavaScript Differences](docs/Cordova%20JavaScript%20Differences.md).

We use a very thin Apache Cordova wrapper to encapsulate the We Vote React WebApp.  The WeVoteCordova side is so thin, is that
all it contains is Apache Cordova, some Documentation, and the iOS and Android config (and possibly a small amount of 
native code).  All of the JavaScript and React code, and the libraries that they rely on, remains in the WeVote WebApp.

This Cordova App has two build targets, iOS and Android, and they each
wrap an identical `bundle.js` that is compiled by the We Vote WebApp project.

**[Making an iOS Release](docs/MakingAniOSrelease.md)**

**[Making an Android Release](docs/MakingAnAndroidRelease.md)**

**[Cordova JavaScript Differences](docs/CordovaJavaScriptDifferences.md)**

**[Testing with localhost from an actual phone](docs/TestingWithLocalHostFromPhone.md)**

## You need a Mac to develop for iOS

That's Apple's decision, not ours.  So these instructions assume you have a Mac, so if you use Linux or Windows, you will
only be able to develop for Android -- we don't have any install instructions for Linux or Window.

## You need to have the code for the We Vote WebApp setup on your machine

If you haven't done this yet, don't waste your time, go setup the WebApp with current code,
get it to start up at least once, and then return here when you are done.

If you can't find a file called `WebApp/build/js/bundle.js` on your machine, don't proceed
until you can find it.

## Directories

If you followed the instructions for installing the WebApp you put your code at

    /Users/<YOUR NAME HERE>/MyProjects/WebApp

The rest of these instructions assume this specific path.

## Symlinks

Plan on cloning the WeVoteCordova app into a directory that parallels the We Vote WeApp directory on your computer.

These two www directories are joined together with [symlinks/Symbolic links](https://en.wikipedia.org/wiki/Symbolic_link)


Cordova has a cool command line interface "cordova add" etc.  Adding new plugins should be captured by our Git source control setup, adding platforms
like "windowphone" is messy and will probably take some experimentation.  Lots of Stack Overflow solutions suggest doing something like ...

```
     cordova platform remove android
     cordova platform add android
```

but those are not symlink friendly, and will probably require something like a fresh install.

Someday we should build a script that builds all the links on demand, or even better, a pre-compile hook that handles it all on the fly.

## Install our Code and the Cordova Libraries

1. Change to your base "MyProjects" equivalent directory
    ```
    cd /Users/stevepodell/MyProjects
    ```

1.  If you are re-installing, remove prior installs
    ```
    rm -fr WeVoteCordovaPopulated
    rm -fr WeVoteCordova
    ```

1.  Clone the WeVoteCordova code

    ```
    git clone https://github.com/wevote/WeVoteCordova.git
    ```

1.  Install the Apache Cordova software

    ```
    npm install -g cordova
    ```

1.  CD to the www directory and make the first symbolic link for `bundle.js`

    ```
    cd WeVoteCordova
    cd www
    ln -s /Users/stevepodell/MyProjects/WebApp/build/js/bundle.js bundle.js
    ```

1.  Manually remove a Cordova plugin, for which we have source controlled a modified "Objective-C" file
    cd /Users/stevepodell/MyProjects/WeVoteCordova
    rm -fr plugins
    ```

1.  Run (destructive) Cordova CLI commands on the `WeVoteCordova` directory
    ```
    cd /Users/stevepodell/MyProjects/WeVoteCordova
    cordova platform rm ios android
    cordova platform add ios android
    ```
    This step adds all the Cordova libraries, installs up-to-date versions of the Cordova plugins, and sets up directories for iOS and Android,
    but it destroys some of the source controlled configuration files by overwriting them with default scaffolding files.

1.  Rename this code directory to a temporary name: `WeVoteCordovaPopulated`

    ```
    cd /Users/stevepodell/MyProjects
    mv WeVoteCordova WeVoteCordovaPopulated
    ```
    This step has added all the Cordova libraries, installed up-to-date versions of the Cordova plugins, and set up directories for iOS and Android,
    but it destroyed some of the source controlled configuration files by overwriting them with default scaffolding files.

1.  Clone another copy of the WeVoteCordova code

    ```
    git clone https://github.com/wevote/WeVoteCordova.git
    ```

1.  Copy, recursively with no overwrites, all of the "Populated" Cordova files onto the target WeVoteCordova directory.
    This new directory contains all the source controlled files from git,
    and this step adds all the generated -- non-source controlled files.
    ```
    cp -Rvn WeVoteCordovaPopulated/ WeVoteCordova/
    ```
    At this point you can delete the WeVoteCordovaPopulated directory, it has served its purpose.
    All the code for iOS and Android has been installed on your Mac, and we will now do the platform specific setup, then
    setup the IDEs.

1. You may need to setup your Github remotes

   | Repository | URL                                                                               |
   |------------|-----------------------------------------------------------------------------------|     
   | upstream   | https://github.com/wevote/WeVoteCordova.git                                       |
   | origin     | https://github.com/SailingSteve/WeVoteCordova.git   (use your own origin here!)   | 

1. You may need to npm install
    ```
    npm install
    ```


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
    
If you want to test one of those links to see if it really points to where it needs to, stat can confirm it for you 
    ```
    Steves-iMac:www stevepodell$ stat -L bundle.js
    16777221 4560157 -rw-r--r-- 1 stevepodell staff 0 17368113 "May 27 14:48:20 2018" "May 27 14:48:11 2018" "May 27 14:48:11 2018" "May 27 14:24:41 2018" 4194304 33928 0 bundle.js
    Steves-iMac:www stevepodell$ 
    ```

## Install Steps for Android


1. Add a couple of lines to a resource file, that should have been updated by the install of the facebook plugin.

    Until https://github.com/jeduan/cordova-plugin-facebook4/issues/599 is resolved...
    
    Edit `/Users/stevepodell/MyProjects/WeVoteCordova/platforms/android/app/src/main/res/values/strings.xml`
    
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


1. cd to the Android specific code area, and the platform_www directory in that area
Android serves the bundle.js in some situations from `WeVoteCordova/platforms/android/platform_www`
    ```
    cd /Users/stevepodell/MyProjects/WeVoteCordova/platforms/android/platform_www
    ```

1. bundle.js (This file probably will not yet exist in this location)
  ```
  rm bundle.js
  ln -s /Users/stevepodell/MyProjects/WebApp/build/js/bundle.js bundle.js
  ```

1.  Make the other symlinks that the Andriod Cordova app will need while running (including another bundle.js)
    ```
    cd /Users/stevepodell/MyProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    rm index.html
    ln -s /Users/stevepodell/MyProjects/WeVoteCordova/www/index.html index.html
    ln -s /Users/stevepodell/MyProjects/WebApp/build/css css
    ln -s /Users/stevepodell/MyProjects/WebApp/build/fonts fonts
    ln -s /Users/stevepodell/MyProjects/WebApp/build/img img
    ln -s /Users/stevepodell/MyProjects/WebApp/build/javascript javascript

    ```
    When you are done, the Android www directory should look like this
    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/MyProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 152
    drwxr-xr-x  12 stevepodell  staff    384 Apr 12 16:53 .
    drwxr-xr-x   3 stevepodell  staff     96 Apr 12 16:34 ..
    lrwxr-xr-x   1 stevepodell  staff     73 Apr 12 16:53 bundle.js -> /Users/stevepodell/MyProjects/WebApp/build/js/bundle.js
    drwxr-xr-x   6 stevepodell  staff    192 Apr 12 16:34 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  73155 Apr 12 16:34 cordova.js
    -rw-r--r--   1 stevepodell  staff   1845 Apr 12 16:34 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 16:52 css -> /Users/stevepodell/MyProjects/WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     66 Apr 12 16:52 fonts -> /Users/stevepodell/MyProjects/WebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 16:52 img -> /Users/stevepodell/MyProjects/WebApp/build/img
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 16:52 index.html -> /Users/stevepodell/MyProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 stevepodell  staff     71 Apr 12 16:52 javascript -> /Users/stevepodell/MyProjects/WebApp/build/javascript
    drwxr-xr-x   8 stevepodell  staff    256 Apr 12 16:34 plugins
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$
    ```

    **The code install for both platforms is now done.**

## Installing the IDEs:

It is possible to develop for Cordova without IDEs, but you are on your own if you take that path.

Install Apple Xcode from the MacOS App Store, you will need a Mac for the iOS part of this project, and a Mac will also be
fine for Android development.

For Android, install the [Android Studio](https://developer.android.com/studio/index.html)
(a free  IDE, from JetBrains, the makers of PyCharm, WebStorm, IntelliJ, etc.)

## iOS specific IDE and Environment setup
1.  Install Xcode

    The easiest way to install Xcode is via the
    <a href="https://itunes.apple.com/us/app/xcode/id497799835?mt=12" target="_blank">Mac App Store.</a>  The Xcode.app download is 10gb in size.

1.  Install Node and Watchman

    We recommend installing node and watchman via Homebrew.
    ```
    brew install node
    brew install watchman
    ```
    
    On a machine where node may alread have been installed, we want to have version 10 or heigher:
    ```
    Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ node -v
    v6.12.3
    Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ brew upgrade node
    Updating Homebrew...
    ...
    ```

1.  Opening the project with Xcode -- Open xcworkspace, not xcodeproj directories (or else)

Be sure to open **`/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcworkspace`** each time, if
you forget to do this portions of the app will not be in your build, since you won't have referenced the cocopods (a dependency manger,
that pulls in some iOS specific libraries.)

Be sure to NOT open ~~`/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcodeproj`~~ with Xcode,
and don't pick a choice from the history pane ("Don't click these!") in the Welcome to Xcode dialog.  The history unfortunately only contains contains
references to .xcodeproj files.  (Hint:  When that Welcome dialog is displayed, **it is** possible to open the xcworkspace from the File/"Open Recent" menu,
just be sure to open the xcworkspace.)

![ScreenShot](docs/images/WelcomeToXcode.png)

And in the "Welcome to Xcode" dialog, again, don't pick anything from the history list (those are all xcodeproj files), you have to
click "Open another project..." and navigate to the 'WeVoteReactNative.xcworkspace' item (which is actually a directory).


**Clean Build:**

You probably will run into the need to "Clean Build Folder".  To do this in XCode, go to the Product menu, hold down the Option button
(on your Mac keyboard) and select "Clean Build Folder", after it completes (about 10 seconds), press the triangular
Run (Play) button do to a full rebuild


## Opening the project in Xcode

This is very similar to the way we do it with the WeVoteReactNative iOS development.  
  
Download Xcode from the MacOS App Store, and launch it:

Don't use the last opened list, instead click on "Open another project..." (We use an Apple specific packager
called CocoaPods, which forces us to ignore that handy last opened menu.)



After clicking the "Open another project..." button, select the `WeVoteCordova.xcworkspace` file and press Open.

![ScreenShot](docs/images/WeVoteCordova.xcworkspace.png)


Select a simulator type from the menu on top (I use iPhone 8p in this example), then press the triangular green play button,
and the app starts in the simulator.

### Updating the art for the Splashscreen (a rarely required step)

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
replace it with same sized art, and if you wanted to be safe I would use the Xcode IDE to copy them (and automatically rename them)
over the existing files, if you were feeling adventurous you could go directly to the files, and take the new image and 
use it to replace the original and the 12 numbered copies of the old image.

By the way Xcode stores way too much configuration info in a binary file, and messing with them can take days to fix, going directly to the filesystem to make changes is risky.


## Debugging Cordova Differences
Browsers are single threaded, JavaScript on browsers is also single threaded, but JavaScript running in Cordova is 
multi-threaded.  "JavaScript in the WebView does not run on the UI thread, it also has other threads to execute the 
html component and carry out CSS transitions."  This can cause some confusion when debugging Cordova for the first time.

## Debugging Cordova Apps with the Safari debugger


![ScreenShot](docs/images/SafariDevelopMenu.png) 

You don't have to actually use Safari for Mac for anything, but launching its remote debugger.  You can see it opened on its
smallest default page in the picture above, it just has to be running so you can get to that "Develop" menu.  Once you
open the "We Vote Cordova" page that is currently being displayed, in the piture it is the "Welcome to We Vote" page. 
One of the symptoms, of this otherwise good thing (multiple-threads) is tha console.log lines in the resolution of promises
often don't make it to the log.

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


    brew update
    brew install --HEAD libimobiledevice
    brew install --HEAD ios-webkit-debug-proxy
    npm install remotedebug-ios-webkit-adapter -g


Run the remotedebug_ios_webkit_adapter:


    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ remotedebug_ios_webkit_adapter --port=9000
    remotedebug-ios-webkit-adapter is listening on port 9000
    iosAdapter.getTargets
    iosAdapter.getTargets
    iosAdapter.getTargets
    ...


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


## Testing from a physical phone with the API server running on your Mac

If you are developing a Cordova specific feature, that requires access to the API server
running on your Mac, while not using the simulator, some extra setup is required to allow
access to your Mac's localhost.

[Testing with a Physical Phone and a localhost WeVote API Server](docs/TestingWithLocalHostFromPhone.md)


## Git

The Git branching scheme for WeVoteCordova is the same as for the We Vote WebApp


    git checkout develop
    git pull upstream develop
    git push origin develop


otherwise all else in our github workflow is the same.


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
    cordova platform remove android
    cordova platform add android
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

### Running Android Cordova for the first time

1.  Download and install Android Studio

    Click "ok" to downloading and installing any jars or packages that the installer recommends.

1.  On the welcome screen, select "open an existing project"

    The existing project is the WeVoteCordova project that you have already pulled down from git.  Our Android project is 
    contained within the WeVoteCordova project. In the open (file selection) dialog, navigate to your WeVoteCordova working 
    directory, then to platforms, then to android and press Open.  `/Users/stevepodell/MyProjects/WeVoteCordova/platforms/android`

1.  At that point there will be a series of updates and "syncing" options, where you should follow all the default choices.

1.  You will probably be prompted to upgrade Gradle, Genymotion, Cordova plugins, etc.

    Update them all before continuing.  Restart as recommended.

    Don't worry about setting a version control root or remote, all changes that you want to get into 
    git are in the WeVoteCordova enclosing project -- That is where you should do your pull requests,
    not within Android Studio.
    
    ![ScreenShot](docs/images/SucessInstallAndroidStudio.png)

1. Setup the symlinks: start by changing to the android www dir at `android/app/src/main/assets/www`

    ```
    Steves-iMac:android stevepodell$ cd /Users/stevepodell/MyProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    Steves-iMac:www stevepodell$ ls -la
    total 33624
    drwxr-xr-x  8 stevepodell  staff       256 Apr 29 13:45 .
    drwxr-xr-x  3 stevepodell  staff        96 Apr 29 13:45 ..
    -rw-r--r--  1 stevepodell  staff  17126402 Apr 29 13:45 bundle.js
    drwxr-xr-x  6 stevepodell  staff       192 Apr 29 13:45 cordova-js-src
    -rw-r--r--  1 stevepodell  staff     73155 Apr 29 13:45 cordova.js
    -rw-r--r--  1 stevepodell  staff      1845 Apr 29 13:45 cordova_plugins.js
    -rw-r--r--  1 stevepodell  staff      5965 Apr 29 13:45 index.html
    drwxr-xr-x  8 stevepodell  staff       256 Apr 29 13:45 plugins
    Steves-iMac:www stevepodell$ 
    ```
    
1. Add the rest of the symlinks.  This step removes the bundle.js and index.html that was copied here when you 
ran "cordova platform add android"

    ```
    Steves-iMac:www stevepodell$ rm bundle.js
    Steves-iMac:www stevepodell$ ln -s /Users/stevepodell/MyProjects/WebApp/build/js/bundle.js bundle.js
    Steves-iMac:www stevepodell$ rm index.html
    Steves-iMac:www stevepodell$ ln -s /Users/stevepodell/MyProjects/WeVoteCordova/www/index.html index.html
    Steves-iMac:www stevepodell$ ln -s /Users/stevepodell/MyProjects/WebApp/build/css css
    Steves-iMac:www stevepodell$ ln -s /Users/stevepodell/MyProjects/WebApp/build/fonts fonts
    Steves-iMac:www stevepodell$ ln -s /Users/stevepodell/MyProjects/WebApp/build/img img
    Steves-iMac:www stevepodell$ ln -s /Users/stevepodell/MyProjects/WebApp/build/javascript javascript
    Steves-iMac:www stevepodell$ 
    Steves-iMac:www stevepodell$ ls -la
    total 152
    drwxr-xr-x  12 stevepodell  staff    384 May  9 20:43 .
    drwxr-xr-x   3 stevepodell  staff     96 Apr 29 13:45 ..
    lrwxr-xr-x   1 stevepodell  staff     55 May  9 13:28 bundle.js -> /Users/stevepodell/MyProjects/WebApp/build/js/bundle.js
    drwxr-xr-x   6 stevepodell  staff    192 Apr 29 13:45 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  73155 Apr 29 13:45 cordova.js
    -rw-r--r--   1 stevepodell  staff   1845 Apr 29 13:45 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     46 May  9 20:43 css -> /Users/stevepodell/MyProjects/WebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     48 May  9 20:43 fonts -> /Users/stevepodell/MyProjects/WebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff     46 May  9 20:43 img -> /Users/stevepodell/MyProjects/WebApp/build/img
    lrwxr-xr-x   1 stevepodell  staff     58 May  9 20:42 index.html -> /Users/stevepodell/MyProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 stevepodell  staff     53 May  9 20:43 javascript -> /Users/stevepodell/MyProjects/WebApp/build/javascript
    drwxr-xr-x   8 stevepodell  staff    256 Apr 29 13:45 plugins
    Steves-iMac:www stevepodell$ 
    ```
    
1.  Android (Java) projects need a Run configuration to start

    ![ScreenShot](docs/images/AndroidStudioAcceptDefaultSettings.png)

    Accept the default settings and press "OK"
    
    You might see a warning: "**WARNING:** Configuration 'compile' is obsolete and has been replaced with 'implementation' 
    and 'api'.", but it is safe to ignore


1. Press the green "play" button to attempt to start running

    ![ScreenShot](docs/images/AndroidStudioNoDeploymentTarget.png)
    
    If you have an Android phone or tablet, you can plug it in via USB.  Make sure debugging via tethering is 
    enabled (google this. it varies between phone manufacturers).  If it is enabled you will see the name of the 
    connected device (Motorola Moto G, in this example) in the dialog.  Press "OK", and the CordovaApp should start right up on 
    the phone.
    
    ![ScreenShot](AndroidDeviceConnected.png)


     ![ScreenShot](docs/images/AndroidStudioEditRunConfigurations.png)
     ![ScreenShot](docs/images/AndoridEditConfigNoAndroidSDK.png)
     ![ScreenShot](docs/images/AndroidSDKSetup.png)


### Modify Build Configuration

1.  As of March 29, 2018, if you get a project compile error in AndroidStudio ```Could not find method jackOptions() for arguments [cordova_SafariViewController_...```
you might have to remove the jack settings in ```WeVoteCordova/platforms/android/cordova-plugin-safariviewcontroller/cordova-SafariViewController-java18.gradle```
this file is source controlled by We Vote, but updating the plugin could expose this problem again. See "Migrate from Jack" at https://developer.android.com/studio/write/java8-support.html.

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


### Running Android Cordova for the first time

![ScreenShot](docs/images/AndoridEditConfigNoAndroidSDK.png)
![ScreenShot](docs/images/AndroidSDKSetup.png)


### Debugging Android Cordova

Just like iOS!  Use the [chrome://inspect/#devices](chrome://inspect/#devices) in Chrome, but no need to start the 
remotedebug_ios_webkit_adapter server, something in Android or Android Studio has done that for us automatically.

### If the Twitter Redirect stops working in iOS

Make sure the custom scheme URL Type is still setup in Xcode

![ScreenShot](docs/images/SettingUpTheIosCustomScheme.png)
__
### iOS has two config.xml files -- make sure you change both

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

### Moving the spinner upwards on the iOS Splash screen and changing it from grey to white:  Manual step required

In the non-source controlled file `/Users/stevepodell/MyProjects/WeVoteCordova/platforms/ios/WeVoteCordova/Plugins/cordova-plugin-splashscreen/CDVSplashScreen.m` 
change two lines.  The first at about line 84:

    UIActivityIndicatorViewStyle topActivityIndicatorStyle = UIActivityIndicatorViewStyleGray;
to

    UIActivityIndicatorViewStyle topActivityIndicatorStyle = UIActivityIndicatorViewStyleWhite;

The second at about line 102:


    _activityView.center = CGPointMake(parentView.bounds.size.width / 2, parentView.bounds.size.height / 1 );
to

    _activityView.center = CGPointMake(parentView.bounds.size.width / 2, parentView.bounds.size.height * 1 / 5 );


----------
## Other documentation pages:

**[Making an iOS Release](docs/MakingAniOSrelease.md)**

**[Making an Android Release](docs/MakingAnAndroidRelease.md)**

**[Cordova JavaScript Differences](docs/CordovaJavaScriptDifferences.md)**

**[Testing with localhost from an actual phone](docs/TestingWithLocalHostFromPhone.md)**
