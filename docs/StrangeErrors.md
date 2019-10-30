This is really just a list of strange things that happen at install
or upgrade, and the fixes that allowed me to proceed -- Sometimes the
same problem appears months later, mostly at upgrade time.

1) In Xcode, 'sandbox is not in sync'
    diff: /../Podfile.lock: No such file or directory
    diff: Manifest.lock: No such file or directory error: 
    The sandbox is not in sync with the Podfile.lock. Run 'pod install' or update your CocoaPods installation.`
https://stackoverflow.com/questions/17072396/cocoapods-errors-on-project-build
![ScreenShot](https://i.stack.imgur.com/bnGus.png)
![ScreenShot](images/NeedToUsePodsTargets.png)


2) Sometimes you lose the Launch Images and AppIcon settings
Open the Images.xcassets in Xcode, and
drag the images from your IDE or Finder to the Xcode IDE.  Clicking on
the missing icon/launch image shows which size is needed.
![ScreenShot](images/DragLaunchImages.png)
