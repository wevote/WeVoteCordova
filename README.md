# Installing the app:

https://cordova.apache.org/docs/en/latest/guide/platforms/ios/index.html#requirements-and-support

http://harrymoreno.com/2015/07/14/Deploying-a-React-App-to-Cordova.html

Too rough to use, just some raw command lines that need work before anyone else could use them

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

#Opening the project in Xcode

<img src="https://github.com/wevote/WeVoteReactCordova/blob/develop/docs/images/WeVoteCordova.xcworkspace.png" alt="alt text" width="600" >


# Debugging Cordova Apps


1. Enable debugging in Safari, [see this article](http://geeklearning.io/apache-cordova-and-remote-debugging-on-ios/)
1. Build your 'compiled' javascript app file `bundle.js`, on my Mac it is at `build/js/bundle.js`.  This file needs to be symlinked
into your www directory (see the section on symlinks above).
    1. On my Mac in WebStorm, I have a Gulp task that has a target "build", when I press the play button for that task, it builds the
bundle.js in 20 seconds (Two seconds to gather all the js scripts together, and 18 seconds to recompile sass).
1. Press the play button in code, which should start the Simulator and load and start the WeVote WebApp.
1. In Safari open Develop/Simulator/WeVoteCordova/WeVote and the Safari Web Inspector appears.


