# The WeVoteCordova app for iOS and Android

We use a very thin Apache Cordova wrapper to encapsulate the We Vote React WebApp.  Two builds are planned this Cordova 
app project, one each for iOS and Android.

# Installing the app:

https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support

http://harrymoreno.com/2015/07/14/Deploying-a-React-App-to-Cordova.html

Download the WeVoteCordova app into a directory that parallels the We Vote WeApp directory on your computer.  Steve put his in
`/Users/stevepodell/WebstormProjects/WeVoteCordova` with his WebApp in `/Users/stevepodell/WebstormProjects/StevesForkOfWebApp`, but 
you can put them where you like.

Install Apple XCode from the MacOS App Store, you will need a Mac for the iOS part of this project, and a Mac will also be
fine for Android development.  Follow the instructions from WeVoteReactNative for XCode install.

You may need to install Gradle, a Java build tool for the Android side.  `npm install gradle`

There is a separate build procedure for WeVoteCordova and the We Vote WebApp, but you need to have the WebApp built first
to be successful with the WeVoteCordova build since WeVoteCordova relies on the `bundle.js` that is the 'compiled' result
of the React WebApp.

Cordova and our WeVoteCordova wants to load the `bundle.js` from a www directory, that ()on Steve's Mac) is at `/Users/stevepodell/WebstormProjects/WeVoteCordova/www`
and in order to make the setup easy to understand, there is now a www directory in the WebApp at `/Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www`
These two www directories are joined together with [symlinks/Symbolic links](https://en.wikipedia.org/wiki/Symbolic_link)

#Creating all the Symlinks

These instructions are based on the following two home project directories...  

```
    /Users/stevepodell/WebstormProjects/WeVoteCordova
    /Users/stevepodell/WebstormProjects/StevesForkOfWebApp
```

Your directories will have different names, so you will have to adapt your symlink commands to your structure

1. Create a symbolic Link so that WeVoteCordova project sees the WebApp projects's www directory as its own www directory

    ```
    cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios
    ln -s ../StevesForkOfWebApp/www
    ```

1. Create a group of symlinks so that the WebApp project's www directory sees various subdirectories in the pre-existing WebApp project's directory 
structure, and certain subdirectories in WeVoteCordova as if they were in the WebApp project's www directory.
   ```
    cd /Users/stevepodell/WebstormProjects/WeVoteCordova/www
    ln -s ../../WeVoteCordova/platforms/ios/platform_www/cordova.js cordova.js
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www/bundle.js bundle.js
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css css
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript javascript
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img img
    ln -s ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js cordova_plugins.js
    ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/fonts fonts
    ```
    
1. After creating all those links, the two www directories should look like this... first Cordova

    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ cd /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$ ls -la
    total 48
    drwxr-xr-x  15 stevepodell  staff   480 Jan 12 15:46 .
    drwxr-xr-x   4 stevepodell  staff   128 Jan 12 12:55 ..
    -rw-r--r--@  1 stevepodell  staff  6148 Jan 18 19:12 .DS_Store
    -rw-r--r--   1 stevepodell  staff    53 Jan 12 12:54 .gitignore
    drwxr-xr-x   7 stevepodell  staff   224 Jan 12 12:54 CordovaLib
    drwxr-xr-x  14 stevepodell  staff   448 Jan 12 12:54 WeVoteCordova
    drwxr-xr-x@  3 stevepodell  staff    96 Jan 12 12:54 WeVoteCordova.xcodeproj
    drwxr-xr-x@  5 stevepodell  staff   160 Jan 12 13:03 WeVoteCordova.xcworkspace
    drwxr-xr-x  26 stevepodell  staff   832 Jan 12 12:54 cordova
    -rw-r--r--   1 stevepodell  staff   337 Jan 12 12:54 ios.json
    drwxr-xr-x   5 stevepodell  staff   160 Jan 12 12:54 platform_www
    -rw-r--r--   1 stevepodell  staff   860 Jan 12 12:54 pods-debug.xcconfig
    -rw-r--r--   1 stevepodell  staff   859 Jan 12 12:54 pods-release.xcconfig
    lrwxr-xr-x   1 stevepodell  staff    31 Jan 12 15:46 www -> ../../../StevesForkOfWebApp/www
    (WebAppEnv)Steves-MacBook-Pro-2017:ios stevepodell$
    ```

1. and for the WebApp...

    ```
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ cd /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 16
    drwxr-xr-x  10 stevepodell  staff   320 Jan 19 17:05 .
    drwxr-xr-x  30 stevepodell  staff   960 Jan 19 09:02 ..
    lrwxr-xr-x   1 stevepodell  staff    73 Jan 16 17:02 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    lrwxr-xr-x   1 stevepodell  staff    57 Jan 12 14:57 cordova.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova.js
    lrwxr-xr-x   1 stevepodell  staff    65 Jan 18 20:20 cordova_plugins.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 17 13:50 css -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff    66 Jan 19 17:05 fonts -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/fonts
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 18 16:57 img -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img
    -rw-r--r--   1 stevepodell  staff  6301 Jan 19 08:41 index.html
    lrwxr-xr-x   1 stevepodell  staff    71 Jan 17 14:04 javascript -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 
    ```

Once you have setup the symlinks, you can compile all the React in your WebApp setup as before, which creates a `bundle.js` 
file.  Then in the cordova project, you might not need to do anything.  Using the Xcode compiler will start up your Cordova 
project which contains the `bundle.js` and run it in a simulator, or on a phone attached with a USB cable.

# Opening the project in Xcode

This is very similar to the way we do it with the WeVoteReactNative iOS development.  
  
Download Xcode from the MacOS App Store, and launch it:

![ScreenShot](docs/images/WelcomeToXcode.png)

Don't use the last opened list, instead click on "Open another project..." (We use an Apple specific packager
called CocoaPods, which forces us to ignore that handy last opened menu.)

![ScreenShot](docs/images/WeVoteCordova.xcworkspace.png)

After clicking the "Open another project..." button, select the `WeVoteCordova.xcworkspace` file and press Open.

![ScreenShot](docs/images/SafariDevelopMenu.png) 

Select a simulator type from the menu on top (I use iPhone 8p in this example), then press the triangular green play button,
and the app starts in the simulator.


# Debugging Cordova Apps with the Safari debugger

![ScreenShot](docs/images/SafariSimulatorRunning.png)

It is easy to get the Safari debugger working, but it is missing lots of features that we are used to from the
Chrome Debugger.


1. Enable debugging in Safari, [see this article](http://geeklearning.io/apache-cordova-and-remote-debugging-on-ios/)
1. Build your 'compiled' javascript app file `bundle.js`, on my Mac it is at `build/js/bundle.js`.  This file needs to be symlinked
into your www directory (see the section on symlinks above).
    1. On my Mac in WebStorm, I have a Gulp task that has a target "build", when I press the play button for that task, it builds the
bundle.js in 20 seconds (Two seconds to gather all the js scripts together, and 18 seconds to recompile sass).
1. Press the play button in Xcode, which should start the Simulator, load, and then start the WeVote WebApp.
1. In Safari open Develop/Simulator/WeVoteCordova/WeVote and the Safari Web Inspector appears.

# Debugging Cordova Apps with the Chrome dev tools

Chrome devtools is lightyears better than the Safari debugger, but is a bit challenging to get working. 

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

After starting the remotedebug_ios_webkit_adapter (hopefully on the first attempt) when you navigate
in chrome to `chrome://inspect` you will see the following screen, with the process to debug on the
list below:

![ScreenShot](docs/images/ChromeInspect.png)
  
Press that little blue 'inspect' to open the debugger, which should look like the following:

![ScreenShot](docs/images/ChromeInspectWDebuggerShowing.png)

Unfortunately in both the Apple and Chrome debuggers, breakpoints are not maintained between restarts
of the app, and also the files where you want to put the breakpoints have to be reopened each time.  (This deficiency
is not the case in React-Native, so hopefully a fix will arrive some day.)


# WebApp code changes needed to support Cordova

In Apache Cordova, all the real app code is in that `bundle.js` we make in the WebApp setup, but there are some code
changes in the WebApp that are necessary to support cordova.

[Cordova JavaScript Differences](docs/Cordova%20JavaScript%20Differences.md).