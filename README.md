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
   `/Users/<YOUR NAME HERE>/MyProjects/WebApp`

Steve put his webapp at

    /Users/stevepodell/WebstormProjects/StevesForkOfWebApp

And put his Cordova code at

    /Users/stevepodell/WebstormProjects/WeVoteCordova

The rest of these instructions assume these specific paths, you will have to adapt
the paths to fit your install setup.

## Symlinks

Plan on cloning the WeVoteCordova app into a directory that parallels the We Vote WeApp directory on your computer.

These two www directories are joined together with [symlinks/Symbolic links](https://en.wikipedia.org/wiki/Symbolic_link)


Cordova has a cool command line interface "cordova add" etc.  Adding new plugins should be captured by our Git source control setup, adding platforms
like "windowphone" is messy and will probably take some experimentation.  Lots of Stack Overflow solutions suggest doing something like a
 ```
     cordova platform remove android
     cordova platform add android
 ```
but those are not symlink friendly, and will probably require something like a fresh install.

Someday we should build a script that builds all the links on demand, or even better, a pre-compile hook that handles it all on the fly.

## Install our Code and the Cordova Libraries

1. Change to your base "MyProjects" equivalent directory
```
    cd /Users/stevepodell/WebstormProjects
```

1. If you are re-installing, remove prior installs
    ```
    rm -fr WeVoteCordovaPopulated
    rm -fr WeVoteCordova
    ```

1. Clone the WeVoteCordova code
    ```
    git clone https://github.com/wevote/WeVoteCordova.git
    ```

1. Make a www directory and the first symbolic link `for bundle.js`
    ```
    cd WeVoteCordova
    mkdir www
    cd www
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js bundle.js
    cd ../..
    ```

1. Copy this code directory to a tempoary name `WeVoteCordovaPopulated`
    ```
   mv WeVoteCordova WeVoteCordovaPopulated
    ```

1. Then clone another copy of the code
    ```
    git clone https://github.com/wevote/WeVoteCordova.git
    ```

1. Run a (destructive) Cordova CLI commands on the `WeVoteCordovaPopulated` directory
    ```
    cd /Users/stevepodell/WebstormProjects/WeVoteCordovaPopulated/
    cordova platform rm ios android
    cordova platform add ios android
    cd ..
    ```
This step adds all the Cordova libraries, and sets up directories for iOS and Android.

1. Copy, recursively with no overwrites,all the Cordova files onto the directory with the code we want to keep from Git
    ```
    cp -Rvn WeVoteCordovaPopulated/ WeVoteCordova/
    ```
At this point you can delete the WeVoteCordovaPopulated directory, it has served its purpose.
All the code for iOS and Android has been installed on your Mac, now we will do the platform specific setup, then
setup the IDEs.

## Platform specific iOS setup

1. cd to the iOS specific code area, and the www directory in that area
iOS serves the bundle.js, the index.html, and other files from `WeVoteCordova/platforms/ios/www`
    ```
  cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
    ```

1. bundle.js
There will be a `bundle.js` file in that www directory, but it would instantly get outdated as you
update the WebApp in the course of developing the Cordova app, so delete it, and make a symbolic link to where the
WebApp compile process leaves the new `bundle.js`

    ```
    rm bundle.js
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js bundle.js
    ```

1. Make the other symlinks that the iOS cordova app will need while running
    ```
    ln -s /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html index.html
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css css
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/fonts fonts
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img img
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript javascript
    ```

    When you are done the ios www directory should look like this

    ```
    Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
    Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 168
    drwxr-xr-x  12 stevepodell  staff    384 Apr 12 17:23 .
    drwxr-xr-x  14 stevepodell  staff    448 Apr 12 16:34 ..
    lrwxr-xr-x   1 stevepodell  staff     73 Apr 12 17:22 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    drwxr-xr-x   5 stevepodell  staff    160 Apr 12 16:34 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  78044 Apr 12 16:34 cordova.js
    -rw-r--r--   1 stevepodell  staff   1845 Apr 12 16:34 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 17:22 css -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     66 Apr 12 17:22 fonts -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 17:22 img -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 17:22 index.html -> /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 stevepodell  staff     71 Apr 12 17:23 javascript -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript
    drwxr-xr-x   8 stevepodell  staff    256 Apr 12 16:34 plugins
    Steves-MacBook-Pro-2017:www stevepodell$
    ```


## Install Steps for Android

1. cd to the Android specific code area, and the platform_www directory in that area
Android serves the bundle.js in some situations from `WeVoteCordova/platforms/android/platform_www`
    ```
    cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/platform_www
    ```

1. bundle.js
  ```
  rm bundle.js
  ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js bundle.js
  ```

1.  Make the other symlinks that the Andriod Cordova app will need while running (including another bundle.js)
    ```
    cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    ln -s /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html index.html
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css css
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/fonts fonts
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img img
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img img
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript javascript
    rm bundle.js
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js bundle.js
    ```
    When you are done, the Android www directory should look like this
    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/app/src/main/assets/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 152
    drwxr-xr-x  12 stevepodell  staff    384 Apr 12 16:53 .
    drwxr-xr-x   3 stevepodell  staff     96 Apr 12 16:34 ..
    lrwxr-xr-x   1 stevepodell  staff     73 Apr 12 16:53 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    drwxr-xr-x   6 stevepodell  staff    192 Apr 12 16:34 cordova-js-src
    -rw-r--r--   1 stevepodell  staff  73155 Apr 12 16:34 cordova.js
    -rw-r--r--   1 stevepodell  staff   1845 Apr 12 16:34 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 16:52 css -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff     66 Apr 12 16:52 fonts -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 16:52 img -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img
    lrwxr-xr-x   1 stevepodell  staff     64 Apr 12 16:52 index.html -> /Users/stevepodell/WebstormProjects/WeVoteCordova/www/index.html
    lrwxr-xr-x   1 stevepodell  staff     71 Apr 12 16:52 javascript -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript
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
### Install Xcode

The easiest way to install Xcode is via the
<a href="https://itunes.apple.com/us/app/xcode/id497799835?mt=12" target="_blank">Mac App Store.</a>  The Xcode.app download is 10gb in size.

### Install Node and Watchman

We recommend installing node and watchman via Homebrew.

    brew install node
    brew install watchman

### Opening the project with Xcode -- Open xcworkspace, not xcodeproj directories (or else)

Be sure to open **`/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcworkspace`** each time, if
you forget to do this portions of the app will not be in your build, since you won't have referenced the cocopods (a dependency manger,
that pulls in some iOS specific libraries.)

Be sure to NOT open ~~`/Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcodeproj`~~ with Xcode,
and don't pick a choice from the history pane ("Don't click these!") in the Welcome to Xcode dialog.  The history unfortunately only contains contains
references to .xcodeproj files.  (Hint:  When that Welcome dialog is displayed, **it is** possible to open the xcworkspace from the File/"Open Recent" menu,
just be sure to open the xcworkspace.)

<img src="https://github.com/wevote/WeVoteReactNative/blob/develop/docs/images/Welcome%20To%20Xcode.png" alt="alt text" width="600" >

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

![ScreenShot](docs/images/WelcomeToXcode.png)

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


## Testing from a physical phone with the API server running on your Mac

If you are developing a Cordova specific feature, that requires access to the API server
running on your Mac, while not using the simulator, some extra setup is required to allow
access to your Mac's localhost.

[Testing with a Physical Phone and a localhost WeVote API Server](docs/TestingWithLocalHostFromPhone.md)


## Git

The Git branching scheme for WeVoteCordova is the same as for the We Vote WebApp

```
    git checkout develop
    git pull upstream develop
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

    ![ScreenShot](docs/images/XcodeGeneralProperties.png)
    
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
      ![ScreenShot](docs/images/UploadToAppStore.png)

   * After upload, it could take a half hour for the build to appear on itunes connect, and then
the build could be "Processing" for another half hour.  (Due to an ancient Apple WebObjects
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

