# The WeVoteCordova app for iOS and Android

We use a very thin Apache Cordova wrapper to encapsulate the We Vote React WebApp.  Two builds are planned, one each for
iOS and Android.

# Installing the app:

https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support

http://harrymoreno.com/2015/07/14/Deploying-a-React-App-to-Cordova.html

Download the WeVoteCordova app into a directory that parallels the We Vote WeApp directory on your computer.  Steve put his in
/Users/stevepodell/WebstormProjects/WeVoteCordova with his WebApp in /Users/stevepodell/WebstormProjects/StevesForkOfWebApp, but 
you can put them where you like.

Install Apple XCode from the MacOS App Store, you will need a Mac for the iOS part of this project, and a Mac will also be
fine for Android.  Follow the instructions from WeVoteReactNative for XCode install.

You may need to install Gradle, a Java build tool for the Android side.  `npm install gradle`

There is a seperate build proceedure for WeVoteCordova and the We Vote Webapp, but you need to have the WebApp built first
to be successful with the WeVoteCordova build since WeVoteCordova relies on the `bundle.js` that is the 'compiled' result
of the React WebApp.

Cordova and our WeVoteCordova wants to load the `bundle.js` from a www directory, that on Steve's Mac is at /Users/stevepodell/WebstormProjects/WeVoteCordova/www
and in order to make the setup easy to understand, there is now a www directory in the WebApp at /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www
These two www directories are joined together with [symlinks i.e. Symbolic links](https://en.wikipedia.org/wiki/Symbolic_link)

#Creating all the Symlinks

These instructions are based on the two home project directories...  

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
    ```
    
1. After making all those links, the two www directories should look like this... first Cordova

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
    drwxr-xr-x   9 stevepodell  staff   288 Jan 18 20:20 .
    drwxr-xr-x  30 stevepodell  staff   960 Jan 18 17:08 ..
    lrwxr-xr-x   1 stevepodell  staff    73 Jan 16 17:02 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    lrwxr-xr-x   1 stevepodell  staff    57 Jan 12 14:57 cordova.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova.js
    lrwxr-xr-x   1 stevepodell  staff    65 Jan 18 20:20 cordova_plugins.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 17 13:50 css -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 18 16:57 img -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img
    -rw-r--r--   1 stevepodell  staff  6301 Jan 18 19:54 index.html
    lrwxr-xr-x   1 stevepodell  staff    71 Jan 17 14:04 javascript -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$
    ```


#Too rough to use, just some raw command lines that need work before anyone else could use them

    From within the root directory after cloning,
    
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ 
    
     cordova create WeVoteCordova org.wevote.cordova WeVoteCordova 
      554  cd WeVoteCordova/
      556  cordova platform add ios
      557  cordova platform add android
      558  cordova platform ls
      560  node -v
      561  npm install gradle
      562  cordova requirements
  
    
    Open Xcode and use the “Welcome to Xcode” dialog to open the equivalent on your Mac to /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/WeVoteCordova.xcworkspace
    As with WeVoteReactNative, don’t use the open project history, always navigate to and open the WeVoteCordova.xcworkspace file.
    
    <img src="https://github.com/wevote/WeVoteReactCordova/blob/develop/docs/images/WeVoteCordova.xcworkspace.png" alt="alt text" width="600" >
    
        
      625  ln -s ../StevesForkOfWebApp/www
    
      644  cd /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www
      645  ln -s ../../WeVoteCordova/platforms/ios/platform_www/cordova.js cordova.js
      651  ls -la
    
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 8
    drwxr-xr-x   4 stevepodell  staff   128 Jan 12 13:33 .
    drwxr-xr-x  15 stevepodell  staff   480 Jan 12 13:27 ..
    lrwxr-xr-x   1 stevepodell  staff    43 Jan 12 13:33 bundle.js -> ../../StevesForkOfWebApp/build/js/bundle.js
    -rw-r--r--   1 stevepodell  staff  2571 Jan 12 13:23 index.html
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 

Tuesday:
 
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www/bundle.js bundle.js
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 176
    drwxr-xr-x   9 stevepodell  staff    288 Jan 16 15:41 .
    drwxr-xr-x  17 stevepodell  staff    544 Jan 16 14:17 ..
    lrwxr-xr-x   1 stevepodell  staff     68 Jan 16 15:41 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www/bundle.js
    -rw-r--r--   1 stevepodell  staff  78044 Jan 12 12:54 cordova.js
    -rw-r--r--   1 stevepodell  staff    210 Jan 12 12:54 cordova_plugins.js
    drwxr-xr-x   3 stevepodell  staff     96 Jan 12 12:54 css
    drwxr-xr-x   3 stevepodell  staff     96 Jan 12 12:54 img
    -rw-r--r--   1 stevepodell  staff   2579 Jan 12 15:01 index.html
    drwxr-xr-x   3 stevepodell  staff     96 Jan 12 12:54 js
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 



    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js bundle.js
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 

Jan 17, 2018 (This worked for loading the CSS files in Cordova, and javascript/google-analytics.js)

    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css css
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/ios/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript javascript
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 

Jan 18, 2018

    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ln -s /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img img
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 24
    drwxr-xr-x   9 stevepodell  staff   288 Jan 18 16:57 .
    drwxr-xr-x  30 stevepodell  staff   960 Jan 18 17:08 ..
    lrwxr-xr-x   1 stevepodell  staff    73 Jan 16 17:02 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    lrwxr-xr-x   1 stevepodell  staff    57 Jan 12 14:57 cordova.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova.js
    -rw-r--r--   1 stevepodell  staff   210 Jan 12 12:54 cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 17 13:50 css -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 18 16:57 img -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img
    -rw-r--r--   1 stevepodell  staff  6264 Jan 18 11:48 index.html
    lrwxr-xr-x   1 stevepodell  staff    71 Jan 17 14:04 javascript -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript
     (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ date
    Thu Jan 18 19:39:08 PST 2018
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    -rw-r--r--  1 stevepodell  staff  14116270 Jan 18 17:15 /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ln -s ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js cordova_plugins.js
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 16
    drwxr-xr-x   9 stevepodell  staff   288 Jan 18 20:20 .
    drwxr-xr-x  30 stevepodell  staff   960 Jan 18 17:08 ..
    lrwxr-xr-x   1 stevepodell  staff    73 Jan 16 17:02 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    lrwxr-xr-x   1 stevepodell  staff    57 Jan 12 14:57 cordova.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova.js
    lrwxr-xr-x   1 stevepodell  staff    65 Jan 18 20:20 cordova_plugins.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 17 13:50 css -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css
    lrwxr-xr-x   1 stevepodell  staff    64 Jan 18 16:57 img -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img
    -rw-r--r--   1 stevepodell  staff  6301 Jan 18 19:54 index.html
    lrwxr-xr-x   1 stevepodell  staff    71 Jan 17 14:04 javascript -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 


    
And from the Cordova side:

    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ pwd
    /Users/stevepodell/WebstormProjects/WeVoteCordova/www
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 27760
    drwxr-xr-x  10 stevepodell  staff       320 Jan 18 09:56 .
    drwxr-xr-x  18 stevepodell  staff       576 Jan 18 19:35 ..
    -rw-r--r--@  1 stevepodell  staff      6148 Jan 18 09:56 .DS_Store
    -rw-r--r--   1 stevepodell  staff  14114751 Jan 18 09:51 bundle.js
    -rw-r--r--   1 stevepodell  staff     78044 Jan 12 12:54 cordova.js
    -rw-r--r--   1 stevepodell  staff       210 Jan 12 12:54 cordova_plugins.js
    drwxr-xr-x   3 stevepodell  staff        96 Jan 12 12:54 css
    drwxr-xr-x   3 stevepodell  staff        96 Jan 12 12:54 img
    -rw-r--r--   1 stevepodell  staff      2510 Jan 16 16:12 index.html
    drwxr-xr-x   3 stevepodell  staff        96 Jan 12 12:54 js
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ rm bundle.js 
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ ls -la
    total 192
    drwxr-xr-x   9 stevepodell  staff    288 Jan 18 19:40 .
    drwxr-xr-x  18 stevepodell  staff    576 Jan 18 19:41 ..
    -rw-r--r--@  1 stevepodell  staff   6148 Jan 18 09:56 .DS_Store
    -rw-r--r--   1 stevepodell  staff  78044 Jan 12 12:54 cordova.js
    -rw-r--r--   1 stevepodell  staff    210 Jan 12 12:54 cordova_plugins.js
    drwxr-xr-x   3 stevepodell  staff     96 Jan 12 12:54 css
    drwxr-xr-x   3 stevepodell  staff     96 Jan 12 12:54 img
    -rw-r--r--   1 stevepodell  staff   2510 Jan 16 16:12 index.html
    drwxr-xr-x   3 stevepodell  staff     96 Jan 12 12:54 js
    (WebAppEnv)Steves-MacBook-Pro-2017:www stevepodell$ 

    
After removing the bundle.js from the Cordova side, the WeVoteCordova app still worked in the simulator, I had copied it
there before I knew better.  That css dir 
just contains an "index.css" for the Cordova splash page, the img dir a logo.png for Cordova, the js dir an index.js 
from Cordova, that I don't think is used -- all of these are from the default Cordova install.

Jan 18 pm All the symlinks

    (WebAppEnv)Steves-MacBook-Pro-2017:StevesForkOfWebApp stevepodell$ cd ..
    (WebAppEnv)Steves-MacBook-Pro-2017:WebstormProjects stevepodell$ ls -lR . | grep ^l
    lrwxr-xr-x   1 stevepodell  staff      36 Mar 10  2015 test-driver -> /usr/share/automake-1.14/test-driver
    lrwxr-xr-x     1 stevepodell  staff      30 Jul  1  2017 startwebapp -> /Users/stevepodell/startwebapp
    lrwxr-xr-x  1 stevepodell  staff    73 Jan 16 17:02 bundle.js -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/js/bundle.js
    lrwxr-xr-x  1 stevepodell  staff    57 Jan 12 14:57 cordova.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova.js
    lrwxr-xr-x  1 stevepodell  staff    65 Jan 18 20:20 cordova_plugins.js -> ../../WeVoteCordova/platforms/ios/platform_www/cordova_plugins.js
    lrwxr-xr-x  1 stevepodell  staff    64 Jan 17 13:50 css -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/css
    lrwxr-xr-x  1 stevepodell  staff    64 Jan 18 16:57 img -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/img
    lrwxr-xr-x  1 stevepodell  staff    71 Jan 17 14:04 javascript -> /Users/stevepodell/WebstormProjects/StevesForkOfWebApp/build/javascript
    lrwxr-xr-x   1 stevepodell  staff   31 Jan 12 15:46 www -> ../../../StevesForkOfWebApp/www
    lrwxr-xr-x   1 stevepodell  staff   31 Jan 12 15:46 www -> ../../../StevesForkOfWebApp/www
    lrwxr-xr-x  1 stevepodell  staff  143 Oct  6 14:09 Darwin-38I6DLZ5IH61J.pcm.lock -> /Users/stevepodell/WebstormProjects/react-native-router-flux/Example/ios/build/ModuleCache/38YBKN2W2DIVJ/Darwin-38I6DLZ5IH61J.pcm.lock-27cb1a23
    lrwxr-xr-x  1 stevepodell  staff  142 Oct  6 14:09 UIKit-1V5UHAPTOD24G.pcm.lock -> /Users/stevepodell/WebstormProjects/react-native-router-flux/Example/ios/build/ModuleCache/38YBKN2W2DIVJ/UIKit-1V5UHAPTOD24G.pcm.lock-2fc7f0bb
    (WebAppEnv)Steves-MacBook-Pro-2017:WebstormProjects stevepodell$ cd WeVoteCordova
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ ls -lR . | grep ^l
    lrwxr-xr-x   1 stevepodell  staff   31 Jan 12 15:46 www -> ../../../StevesForkOfWebApp/www
    (WebAppEnv)Steves-MacBook-Pro-2017:WeVoteCordova stevepodell$ 


#Opening the project in Xcode

This is very similar to the way we do it with the WeVoteReactNative iOS development.

<img src="https://raw.githubusercontent.com/wevote/WeVoteCordova/master/docs/images/WeVoteCordova.xcworkspace.png" alt="alt text" width="600" >

# Debugging Cordova Apps


1. Enable debugging in Safari, [see this article](http://geeklearning.io/apache-cordova-and-remote-debugging-on-ios/)
1. Build your 'compiled' javascript app file `bundle.js`, on my Mac it is at `build/js/bundle.js`.  This file needs to be symlinked
into your www directory (see the section on symlinks above).
    1. On my Mac in WebStorm, I have a Gulp task that has a target "build", when I press the play button for that task, it builds the
bundle.js in 20 seconds (Two seconds to gather all the js scripts together, and 18 seconds to recompile sass).
1. Press the play button in code, which should start the Simulator and load and start the WeVote WebApp.
1. In Safari open Develop/Simulator/WeVoteCordova/WeVote and the Safari Web Inspector appears.


