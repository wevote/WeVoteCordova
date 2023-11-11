//Program to build the symlinks from WeVoteCordova www directories to the WebApp build directory
/*

To debug this node program ...
node inspect buildSymLinks /Users/stevepodell/WebstormProjects/WebApp/build

Note:
Example program that adds to the plist
https://github.com/MaximBelov/cordova-plugin-fbsdk/blob/master/scripts/ios/after_prepare.js
*/

/*jshint esversion: 6 */
/*jslint node: true */
/*global process, __dirname */
const path = require('path');
const fs = require('fs');
const { rimrafSync } = require('rimraf');
const readline = require('readline');


function writeCordovaLibGradleWrapperProperties () {
  // Needed for Gradle 8
  const path0 = './platforms/android/gradle';
  const path = './platforms/android/gradle/wrapper';
  const file = path + '/gradle-wrapper.properties';
  console.log(`> Processing ${file}`);
  try {
    if (!fs.existsSync(path)) {
      console.log('Making directory ' + path0);
      fs.mkdirSync(path0);
      console.log('Making directory ' + path);
      fs.mkdirSync(path);
    }
  } catch (err) {
    console.error('Error: Making directory for ' + file + " - " + err);
  }

  // const newValue='distributionUrl=https\\://services.gradle.org/distributions/gradle-8.2.1-all.zip\n';
  const newValue='distributionUrl=https://services.gradle.org/distributions/gradle-8.4-all.zip\n';
  fs.writeFileSync(file, newValue, 'utf8');
  console.log('Created file: ', file);
}

const updateMainAndroidManifest = () => {
  // /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/app/src/main/AndroidManifest.xml
  // Apps targeting Android 12 and higher are required to specify an explicit value for `android:exported` when the corresponding component has an intent filter defined

  // 10/27/23:  play.console.com gave warning:
  //   Anomalous Permission Usage
  //   Your app is requesting permissions which are used by less than 1% of functionally similar apps:
  //   * android.permission.WRITE_CONTACTS
  // And we don't need to update a user's contacts, so removing it here
  const originalFile = './platforms/android/app/src/main/AndroidManifest.xml';
  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.startsWith('<manifest')) {
        if (!line.includes('xmlns:android')) {
          line = line.replace('>', ' xmlns:android="http://schemas.android.com/apk/res/android">')
          console.log('adding::: xmlns:android="http://schemas.android.com/apk/res/android" ::: to android/app/src/main/AndroidManifest.xml');
        }
        newGradle.push(line);
      } else if (line.includes('<service android:name')) {
        if (!line.includes('android:exported="true"')) {
          line = line.replace('>', ' android:exported="true">');
          console.log('adding::: android:exported="true (for <service android:name)  ::: to android/app/src/main/AndroidManifest.xml');
        }
        newGradle.push(line);
      } else if (line.includes('<receiver ')) {
        if (!line.includes('android:exported="true"')) {
          line = line.replace('>', ' android:exported="true">');
          console.log('adding::: android:exported="true (for <receiver )  ::: to android/app/src/main/AndroidManifest.xml');
        }
        newGradle.push(line);
      } else if (line.includes('<uses-permission android:name="android.permission.WRITE_CONTACTS" />')) {
        console.log('removing::: android.permission.WRITE_CONTACTS  ::: from android/app/src/main/AndroidManifest.xml');
        // Don't push the line, thereby deleting it
      } else {
        newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const buildGradle = fs.openSync(originalFile, 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(buildGradle, `${txt}\n`);
      });
      console.log(`updateAndroidBuildGradle added a classpath in ${originalFile}`);
    });
  });
};

const updateAndroidJson = () => {
  // 10/27/23   Not sure if this is necessary, but just in case
  // 10/27/23:  play.console.com gave warning:
  //   Anomalous Permission Usage
  //   Your app is requesting permissions which are used by less than 1% of functionally similar apps:
  //   * android.permission.WRITE_CONTACTS
  // And we don't need to update a user's contacts, so removing it here
  const originalFile = './platforms/android/android.json';

  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    fs.readFile(saveOffFile, 'utf8', function(err, data){
      data = data.replace(/^.*?\{\n.*?android.permission.WRITE_CONTACTS[^}]*\},\n/gm, '')
      fs.writeFile(originalFile, data, 'utf8', () => {
        console.log(`updateAndroidJson removed 'android.permission.WRITE_CONTACTS' in ${originalFile}`);
      });
    });
  });
};

const updateAppBuildGradle = () => {
  const originalFile = './platforms/android/app/build.gradle';
  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.includes('minSdkVersion cordovaConfig.MIN_SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.MIN_SDK_VERSION', '16'));
        console.log('hardcoding::: minSdkVersion ::: to 16 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('targetSdkVersion cordovaConfig.SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.SDK_VERSION', '31'));
        console.log('hardcoding::: targetSdkVersion ::: to 31 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('maxSdkVersion cordovaConfig.MAX_SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.MAX_SDK_VERSION', '34'));
        console.log('hardcoding::: maxSdkVersion ::: to 34 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('compileSdkVersion cordovaConfig.SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.SDK_VERSION', '34'));
        console.log('hardcoding::: compileSdkVersion ::: to 34 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('String gradlePluginGoogleServicesClassPath =')) {
        newGradle.push(line.replace('${cordovaConfig.GRADLE_PLUGIN_GOOGLE_SERVICES_VERSION}', '4.3.8'));
        console.log('hardcoding::: gradlePluginGoogleServicesClassPath ::: version 4.3.8 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('implementation "androidx.core:core')) {
        //    implementation "androidx.core:core:1.3.+"
        newGradle.push('    implementation "androidx.core:core:1.6.0"');
        console.log('updated ::: androidx.core:core ::: to version 1.6.0 in android/app/build.gradle');
      } else {
        newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const buildGradle = fs.openSync(originalFile, 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(buildGradle, `${txt}\n`);
      });
      console.log(`updateAppBuildGradle hardcoded android versions in ${originalFile}`);
    });
  });
};

function getVersionsFromConfigXML () {
  const path = './config.xml';
  const versions = {
    version: 'error',
    iosBundleVersion: 'error',
    androidBundleVersion: 'error',
  };
  const data = fs.readFileSync(path, 'utf-8');
  let regex = /version="(.*?)"/;
  let found = data.match(regex);
  if (found.length > 0) {
    console.log('version from config.xml: ', found[1]);
    versions.version = found[1];
  } else {
    console.log('version from config.xml: error');
  }
  regex = /ios-CFBundleVersion="(.*?)"/;
  found = data.match(regex);
  if (found.length > 0) {
    console.log('ios-CFBundleVersion from config.xml: ', found[1]);
    versions.iosBundleVersion = found[1];
  } else {
    console.log('ios-CFBundleVersion from config.xml: error');
  }
  regex = /android-versionCode="(.*?)"/;
  found = data.match(regex);
  if (found.length > 0) {
    console.log('android-versionCode from config.xml: ', found[1]);
    versions.androidBundleVersion = found[1];
  } else {
    console.log('android-versionCode from config.xml: error');
  }
  return versions;
}

const updateXcodeProj = () => {
  const originalFile = './platforms/ios/We Vote.xcodeproj/project.pbxproj';
  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newProjectPbxproj = [];
    let conf = 'Debug';
    rl.on('line', (line) => {
      if (line.includes('PRODUCT_NAME = "$(TARGET_NAME)";')) {
        newProjectPbxproj.push(line);
        newProjectPbxproj.push("\t\t\t\tSWIFT_VERSION = 4.2;");
        console.log('hardcoding::: SWIFT_VERSION (' + conf + ')::: to 4.2 in We Vote.xcodeproj/project.pbxproj ');
        conf = 'Release';
      } else {
        newProjectPbxproj.push(line);
      }
    });
    rl.on('close', () => {
      const buildXproj = fs.openSync(originalFile, 'w');

      newProjectPbxproj.forEach((txt) => {
        // console.log(txt);
        fs.writeSync(buildXproj, `${txt}\n`);
      });
      console.log(`updateXcodeProj hardcoded iOS Swift version in ${originalFile}`);
    });
  });
};

const updateXcodePlist = () => {
  const originalFile = './platforms/ios/We Vote/We Vote-Info.plist';
  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newWeVoteInfoPlist = [];
    let deleteNextLine = false;
    rl.on('line', (line) => {
      if (deleteNextLine) {
        // Do not push the line, ie delete it
        console.log('deleting::: "' + line.trim() + '" that followed the previous deleted line in We Vote/We Vote-Info.plist');
        deleteNextLine = false;
      } else if (line.includes('<key>NSMainNibFile</key>')) {
        // Do not push the line, ie delete it
        deleteNextLine = true;
        console.log('deleting::: <key>NSMainNibFile</key> in We Vote/We Vote-Info.plist');
      } else if (line.includes('<key>NSMainNibFile~ipad</key>')) {
        // Do not push the line, ie delete it
        deleteNextLine = true;
        console.log('deleting::: <key>NSMainNibFile</key> in We Vote/We Vote-Info.plist');
      } else if (line.includes('FACEBOOK_URL_SCHEME_SUFFIX_PLACEHOLDER</string>')) {
        newWeVoteInfoPlist.push(line.replace('FACEBOOK_URL_SCHEME_SUFFIX_PLACEHOLDER</string>', 'suffix</string>'));
        console.log('hardcoding ::: spurious FACEBOOK_URL_SCHEME_SUFFIX_PLACEHOLDER from cordova-plugin-fbsdk ::: targetSdkVersion ::: to "suffix" in We Vote/We Vote-Info.plist');
      } else if (line.includes('OTHER_APP_SCHEMES_PLACEHOLDER</string>')) {
        newWeVoteInfoPlist.push(line.replace('OTHER_APP_SCHEMES_PLACEHOLDER</string>', 'other-app-schemes-placeholder</string>'));
        console.log('hardcoding ::: spurious OTHER_APP_SCHEMES_PLACEHOLDER from cordova-plugin-fbsdk ::: targetSdkVersion ::: to "other-app-schemes-placeholder" in We Vote/We Vote-Info.plist');
      } else {
        newWeVoteInfoPlist.push(line);
      }
    });
    rl.on('close', () => {
      const buildXproj = fs.openSync(originalFile, 'w');

      newWeVoteInfoPlist.forEach((txt) => {
        // console.log(txt);
        fs.writeSync(buildXproj, `${txt}\n`);
      });
      console.log(`updateXcodePlist updated ${originalFile}`);
    });
  });
};

const updateCordovaLibBuildGradle = () => {
  const originalFile = './platforms/android/CordovaLib/build.gradle';
  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.includes('assets.srcDirs =')) {
        newGradle.push(line);
        newGradle.push('            namespace = \'org.wevote.cordova\'');
        console.log('adding::: namespace = "org.wevote.cordova" ::: to android/CordovaLib/build.gradle');
      } else {
        newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const buildGradle = fs.openSync(originalFile, 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(buildGradle, `${txt}\n`);
      });
      console.log(`updateAndroidBuildGradle added a namespace in ${originalFile}`);
    });
  });
}

const updateBuildReleaseXCConfig = () => {
  const originalFile = './platforms/ios/cordova/build-release.xcconfig';
  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newBuildReleaseXcconfig = [];
    rl.on('line', (line) => {
      if (line.includes('iPhone Distribution')) {
        newBuildReleaseXcconfig.push(line.replace('iPhone Distribution', 'Apple Development'));
        console.log('updated ::: "iPhone Distribution" to "Apple Development" in  in ios/cordova/build-release.xcconfig');
      } else {
        newBuildReleaseXcconfig.push(line);
      }
    });
    rl.on('close', () => {
      const buildXcconfig = fs.openSync(originalFile, 'w');

      newBuildReleaseXcconfig.forEach((txt) => {
        // console.log(txt);
        fs.writeSync(buildXcconfig, `${txt}\n`);
      });
      console.log(`updateBuildReleaseXCConfig updated  ${originalFile}`);
    });
  });
};

const updatePodfile = () => {
  const originalFile = './platforms/ios/Podfile';
  const saveOffFile = originalFile + '.previous'
  console.log(`> Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newBuildReleaseXcconfig = [];
    rl.on('line', (line) => {
      if (line.includes('platform :ios')) {
        newBuildReleaseXcconfig.push(line.replace('11.0', '15.0'));
        console.log('updated ::: platform : ios 11.0 to  15.0  in ios/Podfile');
      } else {
        newBuildReleaseXcconfig.push(line);
      }
    });
    rl.on('close', () => {
      const buildXcconfig = fs.openSync(originalFile, 'w');

      newBuildReleaseXcconfig.forEach((txt) => {
        // console.log(txt);
        fs.writeSync(buildXcconfig, `${txt}\n`);
      });
      console.log(`updatePodfile updated  ${originalFile}`);
    });
  });
};

const removeSymLink = (path) => {
  try {
    rimrafSync(path);
    console.log('rmdir: ' + path);
  } catch (e) {
    console.log('rimrafSync error ' + e);
  }
}

const copyGoogleServices = () => {
  const originalFile = './res/google/google-services.json';
  const destinationFile = './platforms/android/app/google-services.json';
  if (fs.existsSync(destinationFile)) {
    console.log('google-services.json is good to go');
  } else {
    fs.copyFile(originalFile, destinationFile, fs.constants.COPYFILE_EXCL, (err) => {
      if (err) {
        console.log("Copy file error Found:", err);
      } else {
        console.log('Created file: ', destinationFile);
      }
    });
  }
}

/* Sept 21, 2023
stevepodell@Steves-MBP-M1-Dec2021 WeVoteCordova % find . -type f -name "*.xcconfig"
To fix this temporarily until CocoaPods is updated, you can replace DT_TOOLCHAIN_DIR with TOOLCHAIN_DIR in the Firebase related files with the .xcconfig extension, this worked for me
*/

/*************************************************************************************************
 * The following code is run inline when this script is loaded
*************************************************************************************************/
{
  const myArgs = process.argv.slice(2);
  if ((myArgs.length === 0) || ((!myArgs[0].includes('/build')))) {
    console.log('Need to supply a path to the WebApp build directory!  For example:');
    console.log('  node buildSymLinks  /Users/stevepodell/WebstormProjects/WebApp/build/');
    process.exit();
  }

  let webAppPath = myArgs[0];
  if (webAppPath.endsWith('build')) {
    webAppPath += '/';
  }

  let buildAll = true;
  let bundleOnlyArg = myArgs[1] || '';
  if (bundleOnlyArg === 'bundleOnly') {
    buildAll = false;
  }
  console.log('--------------------- buildAll ', buildAll);
  console.log('__dirname', __dirname);

  if (!__dirname.endsWith('/WeVoteCordova')) {
    console.log('buildSymLinks must be run from the weVoteCordova directory');
    process.exit();
  }

  const {symlink} = fs;

  const iosDir = path.join(__dirname, 'platforms/ios/www/');
  const androidDir = path.join(__dirname, 'platforms/android/app/src/main/assets/www/');
  if (buildAll) {
    removeSymLink(androidDir + 'css');
    removeSymLink(iosDir + 'css');
    removeSymLink(androidDir + 'img');
    removeSymLink(iosDir + 'img');
    removeSymLink(androidDir + 'index.html');
    removeSymLink(iosDir + 'index.html');
  }
  removeSymLink(androidDir + 'bundle.js');
  removeSymLink(androidDir + 'bundle.js.map');
  removeSymLink(iosDir + 'bundle.js');
  removeSymLink(iosDir + 'bundle.js.map');

  symlink(webAppPath + 'bundle.js', androidDir + 'bundle.js', 'file', err => console.log(err ? err : 'ln android bundle.js successful'));
  symlink(webAppPath + 'bundle.js', iosDir + 'bundle.js', 'file', err => console.log(err ? err : 'ln ios bundle.js successful'));

  symlink(webAppPath + 'bundle.js.map', androidDir + 'bundle.js.map', 'file', err => console.log(err ? err : 'ln android bundle.js.map successful'));
  symlink(webAppPath + 'bundle.js.map', iosDir + 'bundle.js.map', 'file', err => console.log(err ? err : 'ln ios bundle.js.map successful'));

  if (buildAll) {
    symlink(webAppPath + 'css', androidDir + 'css', 'dir', err => console.log(err ? err : 'ln android css successful'));
    symlink(webAppPath + 'css', iosDir + 'css', 'dir', err => console.log(err ? err : 'ln ios css successful'));

    symlink(webAppPath + 'img', androidDir + 'img', 'dir', err => console.log(err ? err : 'ln android img successful'));
    symlink(webAppPath + 'img', iosDir + 'img', 'dir', err => console.log(err ? err : 'ln ios img successful'));

    symlink(__dirname + '/www/index.html', androidDir + 'index.html', 'file', err => console.log(err ? err : 'ln android index.html successful'));
    symlink(__dirname + '/www/index.html', iosDir + 'index.html', 'file', err => console.log(err ? err : 'ln ios index.html successful'));

    updateXcodePlist();
    updatePodfile();
    updateBuildReleaseXCConfig()
    updateMainAndroidManifest();
    updateAndroidJson();
    copyGoogleServices();
    writeCordovaLibGradleWrapperProperties();
    updateCordovaLibBuildGradle();
    updateXcodeProj();
    fs.readdir(iosDir, function (err, items) {
      console.log(JSON.stringify(items));
    });
  }
}

// // /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/CordovaLib/build.gradle
// const updateCordovaLibBuildGradle = () => {
//   const originalFile = './platforms/android/CordovaLib/build.gradle';
//   const saveOffFile = originalFile + '.previous'
//   console.log(`> Processing ${originalFile}`);
//   fs.rename(originalFile, saveOffFile, () => {
//     const rl = readline.createInterface({
//       input: fs.createReadStream(saveOffFile),
//       crlfDelay: Infinity,
//     });
//     const newGradle = [];
//     rl.on('line', (line) => {
//       if (line.includes('compileSdkVersion cordovaConfig.SDK_VERSION')) {
//         newGradle.push(line.replace('cordovaConfig.SDK_VERSION', '31'));
//         console.log('hardcoding::: compileSdkVersion ::: to 31 in CordovaLib/src/build.gradle (Hack needed for cordova-android 10.1.1)');
//       } else if (line.includes('minSdkVersion cordovaConfig.MIN_SDK_VERSION')) {
//         newGradle.push(line.replace('cordovaConfig.MIN_SDK_VERSION', '16'));
//         console.log('hardcoding::: minSdkVersion ::: to 16 CordovaLib/src/build.gradle (Hack needed for cordova-android 10.1.1)');
//       } else {
//           newGradle.push(line);
//       }
//     });
//     rl.on('close', () => {
//       const buildGradle = fs.openSync(originalFile, 'w');
//
//       newGradle.forEach((txt) => {
//         fs.writeSync(buildGradle, `${txt}\n`);
//       });
//     });
//   });
// };

// /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/cdv-gradle-config.json
// This should be solved in an upcoming version of cordova-android with <preference name="GradleVersion" value="7.2.2" /> -- Still not there Aug 2023
// Obsolete Aug 2023:  MIN_SDK_VERSION is now a preference ... "android-minSdkVersion" and AGP_VERSION is now "7.4.2" when we get here
// const updateCdvGradleConfig = () => {
//   const originalFile = './platforms/android/cdv-gradle-config.json';
//   const saveOffFile = originalFile + '.previous'
//   console.log(`> Processing ${originalFile}`);
//   fs.rename(originalFile, saveOffFile, () => {
//     const rl = readline.createInterface({
//       input: fs.createReadStream(saveOffFile),
//       crlfDelay: Infinity,
//     });
//     const newGradle = [];
//     rl.on('line', (line) => {
//       if (line.includes('AGP_VERSION')) {
//         newGradle.push('  "AGP_VERSION": "7.2.2",');
//         console.log('hardcoding::: AGP_VERSION ::: to 7.2.2 in android/cdv-gradle-config.json');
//       } else if (line.includes('MIN_SDK_VERSION')) {
//         newGradle.push('  "MIN_SDK_VERSION": 16,');
//         console.log('hardcoding::: MIN_SDK_VERSION ::: to 16 in android/cdv-gradle-config.json');
//       } else {
//         newGradle.push(line);
//       }
//     });
//     rl.on('close', () => {
//       const buildGradle = fs.openSync(originalFile, 'w');
//
//       newGradle.forEach((txt) => {
//         fs.writeSync(buildGradle, `${txt}\n`);
//       });
//     });
//   });
// };

// November 18, 2021:  This has some code for cordova-android 9.1 (Which we need to use today) and cordova-android 10 (which was not ready for prime time)
// August 2023: No longer needed, these changes are already in the file when we get here
// const updateGradleProperties = () => {
//   const originalFile = './platforms/android/gradle.properties';
//   const saveOffFile = originalFile + '.previous'
//   console.log(`> Processing ${originalFile}`);
//   fs.rename(originalFile, saveOffFile, () => {
//     const rl = readline.createInterface({
//       input: fs.createReadStream(saveOffFile),
//       crlfDelay: Infinity,
//     });
//     const newGradle = [];
//     rl.on('line', (line) => {
//       if (line.startsWith('android.useAndroidX')) {
//         console.log('adding::: android.useAndroidX=true ::: in android/gradle.properties');
//         newGradle.push('android.useAndroidX=true');
//       } else if (line.startsWith('android.enableJetifier')) {
//         console.log('adding::: android.enableJetifier=true ::: in android/gradle.properties');
//         newGradle.push('android.enableJetifier=true');
//       } else if (line.startsWith('cdvMinSdkVersion=')) {
//         cdvMinSdkVersion=15
//         console.log('updating::: cdvMinSdkVersion ::: to16 in  android/gradle.properties');
//         newGradle.push('cdvMinSdkVersion=16');
//       } else {
//         newGradle.push(line);
//       }
//     });
//     rl.on('close', () => {
//       const gradleProperties = fs.openSync(originalFile, 'w');
//
//       newGradle.forEach((txt) => {
//         fs.writeSync(gradleProperties, `${txt}\n`);
//       });
//       console.log(`updateGradleProperties changed settings in ${originalFile}`);
//       updateAndroidBuildGradle();
//
//     });
//   });
// };

// const updateAndroidBuildGradle = () => {
//   const originalFile = './platforms/android/build.gradle';
//   const saveOffFile = originalFile + '.previous'
//   console.log(`> Processing ${originalFile}`);
//   fs.rename(originalFile, saveOffFile, () => {
//     const rl = readline.createInterface({
//       input: fs.createReadStream(saveOffFile),
//       crlfDelay: Infinity,
//     });
//     const newGradle = [];
//     rl.on('line', (line) => {
//       if (line.startsWith('        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin')) {
//         newGradle.push(line);
//         console.log('adding::: classpath \'com.google.gms:google-services:4.3.10\' ::: to android/build.gradle');
//         newGradle.push('        classpath \'com.google.gms:google-services:4.3.10\'');
//       } else if (line.includes('project.ext')) {
//         newGradle.push(line);
//         console.log('adding::: androidXCore = "1.6.0" ::: (force a downgrade from 1.7.0) to android/build.gradle');  // https://stackoverflow.com/questions/69021225/resource-linking-fails-on-lstar#answer-69024140
//         newGradle.push('      androidXCore = "1.6.0"');
//       } else if (line.includes('defaultCompileSdkVersion=')) {
//         console.log('changing ::: defaultCompileSdkVersion from 29 ::: to 31 to android/build.gradle');
//         newGradle.push(line.replace('=29', '=31'));
//       } else {
//         newGradle.push(line);
//       }
//     });
//     rl.on('close', () => {
//       const buildGradle = fs.openSync(originalFile, 'w');
//
//       newGradle.forEach((txt) => {
//         fs.writeSync(buildGradle, `${txt}\n`);
//       });
//       console.log(`updateAndroidBuildGradle added a classpath in ${originalFile}`);
//     });
//   });
// };
