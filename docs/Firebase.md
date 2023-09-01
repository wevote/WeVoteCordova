## August 11, 2023
```
Removed from package.json:
    "cordova-plugin-firebase-analytics": "^6.1.0",
    "cordova-plugin-firebase-messaging": "^6.1.0",
    
Removed from package.json at about line 45:
     "cordova-plugin-firebase-messaging": {
        "ANDROID_FIREBASE_MESSAGING_VERSION": "21.0.0",
        "ANDROIDX_CORE_VERSION": "1.3.+",
        "IOS_FIREBASE_MESSAGING_VERSION": "~> 6.31.0",
        "IOS_FIREBASE_POD_VERSION": "~> 8.8.0"
      },
      "cordova-plugin-firebase-analytics": {
        "IOS_FIREBASE_POD_VERSION": "~> 8.8.0",
        "ANDROID_FIREBASE_CRASHLYTICS_VERSION": "19.0.+",
        "ANALYTICS_COLLECTION_ENABLED": "true",
        "AUTOMATIC_SCREEN_REPORTING_ENABLED": "true"
      },

To Avoid:

2023-08-11 14:05:26.673 6227-6273/org.wevote.cordova E/FirebaseInstanceId: Failed to get FIS auth token
    java.util.concurrent.ExecutionException: com.google.firebase.installations.FirebaseInstallationsException: Firebase Installations Service is unavailable. Please try again later.
        at com.google.android.gms.tasks.Tasks.zzb(Unknown Source:61)
        at com.google.android.gms.tasks.Tasks.await(Unknown Source:23)
        at com.google.firebase.iid.GmsRpc.setDefaultAttributesToBundle(com.google.firebase:firebase-iid@@21.0.0:55)
        at com.google.firebase.iid.GmsRpc.startRpc(com.google.firebase:firebase-iid@@21.0.0:37)
        at com.google.firebase.iid.GmsRpc.getToken(com.google.firebase:firebase-iid@@21.0.0:13)
        at com.google.firebase.iid.FirebaseInstanceId.lambda$getInstanceId$1$FirebaseInstanceId(com.google.firebase:firebase-iid@@21.0.0:158)
        at com.google.firebase.iid.FirebaseInstanceId$$Lambda$3.start(Unknown Source:8)
        at com.google.firebase.iid.RequestDeduplicator.getOrStartGetTokenRequest(com.google.firebase:firebase-iid@@21.0.0:14)
        at com.google.firebase.iid.FirebaseInstanceId.lambda$getInstanceId$2$FirebaseInstanceId(com.google.firebase:firebase-iid@@21.0.0:157)
        at com.google.firebase.iid.FirebaseInstanceId$$Lambda$0.then(Unknown Source:6)
        at com.google.android.gms.tasks.zzf.run(Unknown Source:2)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1137)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:637)
        at com.google.android.gms.common.util.concurrent.zza.run(Unknown Source:6)
        at java.lang.Thread.run(Thread.java:1012)
     Caused by: com.google.firebase.installations.FirebaseInstallationsException: Firebase Installations Service is unavailable. Please try again later.
        at com.google.firebase.installations.remote.FirebaseInstallationServiceClient.createFirebaseInstallation(FirebaseInstallationServiceClient.java:183)
        at com.google.firebase.installations.FirebaseInstallations.registerFidWithServer(FirebaseInstallations.java:489)
        at com.google.firebase.installations.FirebaseInstallations.doNetworkCallIfNecessary(FirebaseInstallations.java:360)
        at com.google.firebase.installations.FirebaseInstallations.lambda$doRegistrationOrRefresh$2(FirebaseInstallations.java:350)
        at com.google.firebase.installations.FirebaseInstallations$$Lambda$4.run(Unknown Source:4)
        at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1137)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:637)
        at java.lang.Thread.run(Thread.java:1012) 
2023-08-11 14:05:26.687 6227-6272/org.wevote.cordova E/FirebaseInstanceId: Topic sync or token retrieval failed on hard failure exceptions: AUTHENTICATION_FAILED. Won't retry the operation.
```
Answer 2: https://stackoverflow.com/questions/70754272/repost-failed-to-get-fis-auth-token



## Sept 2, 2020

1 yr old starting up and app for android video, using semi-abandoned plugins
https://www.youtube.com/watch?v=AD_I0Z4SRaA

https://console.firebase.google.com/u/4/ 
stevepodell37@gmail.com

Dale linked me into the We Vote analytics account, where I made and
Firebase Project WeVoteApps (internally wevoteapps)

Firebase Cloud Messaging 
Address by id, group, or topic

You can send messages via the Firebase Admin SDK or 
the FCM server protocols. For testing or for sending marketing or engagement messages with powerful built-in targeting and analytics, you can also use the Notifications composer.

![ScreenShot](images/diagram-FirebaseCloudMesssaging.png)

cordova plugin add cordova-plugin-firebase-messaging --save

```
stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % cordova plugin add cordova-plugin-firebase-messaging --save        
Installing "cordova-plugin-firebase-messaging" for android
Installing "cordova-plugin-firebase-analytics" for android
Installing "cordova-support-android-plugin" for android
Installing "cordova-support-google-services" for android
Plugin doesn't support this project's cordova-android version. cordova-android: 9.0.0, failed version requirement: <9.0.0
Skipping 'cordova-support-google-services' for android
Subproject Path: CordovaLib
Subproject Path: app
Plugin dependency "cordova-support-android-plugin@1.0.2" already fetched, using that version.
Dependent plugin "cordova-support-android-plugin" already installed on android.
Plugin dependency "cordova-support-google-services@1.4.1" already fetched, using that version.
Installing "cordova-support-google-services" for android
Plugin doesn't support this project's cordova-android version. cordova-android: 9.0.0, failed version requirement: <9.0.0
Skipping 'cordova-support-google-services' for android
Subproject Path: CordovaLib
Subproject Path: app
Installing "cordova-plugin-firebase-messaging" for ios
Plugin dependency "cordova-plugin-firebase-analytics@4.4.1" already fetched, using that version.
Installing "cordova-plugin-firebase-analytics" for ios
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

/usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/cache.rb:114: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
/usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/request.rb:61: warning: The called method `slug' is defined here

/usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/cache.rb:100: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
/usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-1.8.4/lib/cocoapods/downloader/request.rb:61: warning: The called method `slug' is defined here

     Cloning into '/var/folders/ph/xxznbhbj6zbbn72c_9p71twc0000gn/T/d20200903-93163-184mg4v'...

     Note: switching to 'f9deb8aaf6f423b963d9fd1a190436a12d1caba6'.
     
     You are in 'detached HEAD' state. You can look around, make experimental
     changes and commit them, and you can discard any commits you make in this

     state without impacting any branches by switching back to a branch.
     
     If you want to create a new branch to retain commits you create, you may
     do so (now or later) by using -c with the switch command. Example:
     
       git switch -c <new-branch-name>
     
     Or undo this operation with:
     
       git switch -
     
     Turn off this advice by setting config variable advice.detachedHead to false
     

     Updating files:  75% (2726/3594)
     Updating files:  76% (2732/3594)
     Updating files:  77% (2768/3594)
     Updating files:  78% (2804/3594)
     Updating files:  79% (2840/3594)
     Updating files:  80% (2876/3594)
     Updating files:  81% (2912/3594)
     Updating files:  82% (2948/3594)
     Updating files:  83% (2984/3594)
     Updating files:  84% (3019/3594)
     Updating files:  85% (3055/3594)
     Updating files:  86% (3091/3594)
     Updating files:  87% (3127/3594)
     Updating files:  88% (3163/3594)
     Updating files:  89% (3199/3594)
     Updating files:  90% (3235/3594)
     Updating files:  91% (3271/3594)
     Updating files:  92% (3307/3594)
     Updating files:  93% (3343/3594)
     Updating files:  94% (3379/3594)
     Updating files:  95% (3415/3594)
     Updating files:  96% (3451/3594)
     Updating files:  97% (3487/3594)
     Updating files:  98% (3523/3594)
     Updating files:  99% (3559/3594)
     Updating files: 100% (3594/3594)
     Updating files: 100% (3594/3594), done.

     Cloning into '/var/folders/ph/xxznbhbj6zbbn72c_9p71twc0000gn/T/d20200903-93163-1avcw6c'...

     Note: switching to 'f9deb8aaf6f423b963d9fd1a190436a12d1caba6'.
     
     You are in 'detached HEAD' state. You can look around, make experimental
     changes and commit them, and you can discard any commits you make in this
     state without impacting any branches by switching back to a branch.
     
     If you want to create a new branch to retain commits you create, you may
     do so (now or later) by using -c with the switch command. Example:
     

       git switch -c <new-branch-name>
     
     Or undo this operation with:
     
       git switch -
     
     Turn off this advice by setting config variable advice.detachedHead to false
     

     Updating files:  96% (3482/3594)
     Updating files:  97% (3487/3594)
     Updating files:  98% (3523/3594)
     Updating files:  99% (3559/3594)
     Updating files: 100% (3594/3594)
     Updating files: 100% (3594/3594), done.

     Cloning into '/var/folders/ph/xxznbhbj6zbbn72c_9p71twc0000gn/T/d20200903-93163-y1dk47'...

     Note: switching to 'fde7cf7358ec7cd69e8db9be4f1fa6a5c431386a'.
     
     You are in 'detached HEAD' state. You can look around, make experimental
     changes and commit them, and you can discard any commits you make in this
     state without impacting any branches by switching back to a branch.
     
     If you want to create a new branch to retain commits you create, you may
     do so (now or later) by using -c with the switch command. Example:
     

       git switch -c <new-branch-name>
     
     Or undo this operation with:
     
       git switch -
     
     Turn off this advice by setting config variable advice.detachedHead to false
     

     Updating files:  74% (1800/2411)
     Updating files:  75% (1809/2411)
     Updating files:  76% (1833/2411)
     Updating files:  77% (1857/2411)
     Updating files:  78% (1881/2411)
     Updating files:  79% (1905/2411)
     Updating files:  80% (1929/2411)
     Updating files:  81% (1953/2411)
     Updating files:  82% (1978/2411)
     Updating files:  83% (2002/2411)
     Updating files:  84% (2026/2411)
     Updating files:  85% (2050/2411)
     Updating files:  86% (2074/2411)
     Updating files:  87% (2098/2411)
     Updating files:  88% (2122/2411)
     Updating files:  89% (2146/2411)
     Updating files:  90% (2170/2411)
     Updating files:  91% (2195/2411)
     Updating files:  92% (2219/2411)
     Updating files:  93% (2243/2411)
     Updating files:  94% (2267/2411)
     Updating files:  95% (2291/2411)
     Updating files:  96% (2315/2411)
     Updating files:  97% (2339/2411)
     Updating files:  98% (2363/2411)
     Updating files:  99% (2387/2411)
     Updating files: 100% (2411/2411)
     Updating files: 100% (2411/2411), done.

/usr/local/lib/ruby/gems/2.7.0/gems/nanaimo-0.2.6/lib/nanaimo/writer/pbxproj.rb:13: warning: Using the last argument as keyword parameters is deprecated; maybe ** should be added to the call
/usr/local/lib/ruby/gems/2.7.0/gems/nanaimo-0.2.6/lib/nanaimo/writer.rb:35: warning: The called method `initialize' is defined here

/usr/local/lib/ruby/gems/2.7.0/gems/cocoapods-core-1.8.4/lib/cocoapods-core/cdn_source.rb:326: warning: URI.escape is obsolete


[!] The `We Vote [Debug]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-We Vote/Pods-We Vote.debug.xcconfig'. This can lead to problems with the CocoaPods installation

[!] The `We Vote [Release]` target overrides the `LD_RUNPATH_SEARCH_PATHS` build setting defined in `Pods/Target Support Files/Pods-We Vote/Pods-We Vote.release.xcconfig'. This can lead to problems with the CocoaPods installation

Adding cordova-plugin-firebase-messaging to package.json


   ╭──────────────────────────────────────╮
   │                                      │
   │   Update available 9.0.0 → 10.0.0    │
   │    Run npm i -g cordova to update    │
   │                                      │
   ╰──────────────────────────────────────╯

stevepodell@Steves-MacBook-Pro-32GB-Oct-2109 WeVoteCordova % 


```

https://www.npmjs.com/package/cordova-plugin-firebase-messaging


