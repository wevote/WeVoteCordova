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
you can put them where you like.

Install Apple Xcode from the MacOS App Store, you will need a Mac for the iOS part of this project, and a Mac will also be
fine for Android development.  Follow the instructions from our WeVoteReactNative project for the Xcode install.

You may need to install Gradle, a Java build tool for the Android side.  `npm install gradle`

There is a separate build procedure for WeVoteCordova and the We Vote WebApp, but you need to have the WebApp built first
to be successful with the WeVoteCordova build since WeVoteCordova relies on the `bundle.js` that is the 'compiled' result
of the React WebApp build.

Cordova and our WeVoteCordova wants to load the `bundle.js` from a www directory, that (on Steve's Mac) is at `/Users/stevepodell/WebstormProjects/WeVoteCordova/www`
and in order to make the setup easy to understand, there is now a www directory in the WebApp at `/Users/stevepodell/WebstormProjects/WebApp/www`
These two www directories are joined together with [symlinks/Symbolic links](https://en.wikipedia.org/wiki/Symbolic_link)

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
    ln -s ../../../WebApp/www
    ```
    
1. After creating this link, the `WeVoteCordova/platforms/ios` directory should look like this... 

    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ ls -la
    total 40
    drwxr-xr-x  15 stevepodell  staff   480 Mar 19 09:16 .
    drwxr-xr-x   5 stevepodell  staff   160 Mar 18 16:55 ..
    -rw-r--r--   1 stevepodell  staff    53 Mar 18 16:36 .gitignore
    drwxr-xr-x   7 stevepodell  staff   224 Mar 18 16:36 CordovaLib
    drwxr-xr-x  15 stevepodell  staff   480 Mar 22 08:49 WeVoteCordova
    drwxr-xr-x@  4 stevepodell  staff   128 Mar 22 08:33 WeVoteCordova.xcodeproj
    drwxr-xr-x@  5 stevepodell  staff   160 Mar 18 16:36 WeVoteCordova.xcworkspace
    drwxr-xr-x  26 stevepodell  staff   832 Mar 18 16:36 cordova
    -rw-r--r--   1 stevepodell  staff    56 Mar 20 15:16 frameworks.json
    -rw-r--r--   1 stevepodell  staff  3528 Mar 20 15:21 ios.json
    drwxr-xr-x   6 stevepodell  staff   192 Mar 19 09:16 platform_www
    -rw-r--r--   1 stevepodell  staff   860 Mar 18 16:36 pods-debug.xcconfig
    -rw-r--r--   1 stevepodell  staff   859 Mar 18 16:36 pods-release.xcconfig
    lrwxr-xr-x   1 stevepodell  staff    32 Mar 19 09:06 www -> ../../../StevesForkOfWebApp/www/
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ 
    ```

1. Then create a group of symlinks so that the WebApp project's www directory sees various subdirectories in the pre-existing WebApp project's directory 
structure, and certain subdirectories in WeVoteCordova as if they were in the WebApp project's www directory.
   ```
    cd /Users/stevepodell/WebstormProjects/WebApp/www
    ln -s ../build/js/bundle.js bundle.js 
    ln -s ../../WeVoteCordova/platforms/ios/platform_www/cordova.js cordova.js
    ln -s ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js cordova_plugins.js
    ln -s ../build/css css
    ln -s ../build/fonts fonts
    ln -s ../build/img img
    ln -s ../build/javascript javascript
    ```
    
1. After creating all those links, the `WebApp/www` directory should look like this... 

    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WebApp/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 48
    drwxr-xr-x  14 stevepodell  staff   448 Mar 22 14:59 .
    drwxr-xr-x  30 stevepodell  staff   960 Mar 22 13:58 ..
    -rw-r--r--   1 stevepodell  staff  6148 Mar 20 15:17 .DS_Store
    lrwxr-xr-x   1 stevepodell  staff    21 Mar 18 11:58 bundle.js -> ../build/js/bundle.js
    drwxr-xr-x   5 stevepodell  staff   160 Mar 20 15:17 cordova-js-src
    lrwxr-xr-x   1 stevepodell  staff    57 Mar 18 12:32 cordova.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova.js
    lrwxr-xr-x   1 stevepodell  staff    65 Mar 18 12:28 cordova_plugins.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    12 Mar 18 12:08 css -> ../build/css
    lrwxr-xr-x   1 stevepodell  staff    14 Mar 18 12:37 fonts -> ../build/fonts
    lrwxr-xr-x   1 stevepodell  staff    12 Mar 21 13:54 img -> ../build/img
    -rw-r--r--   1 stevepodell  staff  5377 Mar 22 14:59 index.html
    lrwxr-xr-x   1 stevepodell  staff    19 Mar 18 12:40 javascript -> ../build/javascript
    drwxr-xr-x   7 stevepodell  staff   224 Mar 19 09:22 plugins
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
      "cordova-plugin-splashscreen": "5.0.2",
      "cordova-plugin-safariviewcontroller": "1.5.2"
    };
```

If they are not present, the commands to install them (from the WeVoteCordova dir) are:

```
  576  cordova plugin add cordova-plugin-device
  578  cordova plugin add cordova-plugin-statusbar
  579  cordova plugin add cordova-plugin-keyboard
  580  cordova plugin add cordova-plugin-splashscreen
  583  cordova plugin add cordova-plugin-safariviewcontroller
```





