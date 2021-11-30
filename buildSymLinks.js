//Program to build the symlinks from WeVoteCordova www directories to the the WebApp build directory
/*jshint esversion: 6 */
/*jslint node: true */
/*global process, __dirname */
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const readline = require('readline');

// TODO: November 18, 2021:  This has some code for cordova-android 9.1 (Which we need to use today) and cordova-android 10 (which was not ready for prime time)

const updateGradleProperties = () => {
  const originalFile = './platforms/android/gradle.properties';
  const saveOffFile = originalFile + '.previous'
  console.log(`Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.startsWith('android.useAndroidX')) {
        console.log('adding::: android.useAndroidX=true ::: in android/gradle.properties');
        newGradle.push('android.useAndroidX=true');
      } else if (line.startsWith('android.enableJetifier')) {
        console.log('adding::: android.enableJetifier=true ::: in android/gradle.properties');
        newGradle.push('android.enableJetifier=true');
      } else if (line.startsWith('cdvMinSdkVersion=')) {
        cdvMinSdkVersion=15
        console.log('updating::: cdvMinSdkVersion ::: to16 in  android/gradle.properties');
        newGradle.push('cdvMinSdkVersion=16');
      } else {
        newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const gradleProperties = fs.openSync(originalFile, 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(gradleProperties, `${txt}\n`);
      });
      console.log(`updateGradleProperties changed settings in ${originalFile}`);
      updateAndroidBuildGradle();

    });
  });
};

const updateAndroidBuildGradle = () => {
  const originalFile = './platforms/android/build.gradle';
  const saveOffFile = originalFile + '.previous'
  console.log(`Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.startsWith('        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin')) {
        newGradle.push(line);
        console.log('adding::: classpath \'com.google.gms:google-services:4.3.10\' ::: to android/build.gradle');
        newGradle.push('        classpath \'com.google.gms:google-services:4.3.10\'');
      } else if (line.includes('project.ext')) {
        newGradle.push(line);
        console.log('adding::: androidXCore = "1.6.0" ::: (force a downgrade from 1.7.0) to android/build.gradle');  // https://stackoverflow.com/questions/69021225/resource-linking-fails-on-lstar#answer-69024140
        newGradle.push('      androidXCore = "1.6.0"');
      } else if (line.includes('defaultCompileSdkVersion=')) {
        console.log('changing ::: defaultCompileSdkVersion from 29 ::: to 31 to android/build.gradle');
        newGradle.push(line.replace('=29', '=31'));
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
      updateCordovaLibBuildGradle();
    });
  });
};

// /Users/stevepodell/WebstormProjects/WeVoteCordova/platforms/android/CordovaLib/build.gradle
const updateCordovaLibBuildGradle = () => {
  const originalFile = './platforms/android/CordovaLib/build.gradle';
  const saveOffFile = originalFile + '.previous'
  console.log(`Processing ${originalFile}`);
  fs.rename(originalFile, saveOffFile, () => {
    const rl = readline.createInterface({
      input: fs.createReadStream(saveOffFile),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.includes('compileSdkVersion cordovaConfig.SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.SDK_VERSION', '31'));
        console.log('hardcoding::: compileSdkVersion ::: to 31 in CordovaLib/src/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('minSdkVersion cordovaConfig.MIN_SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.MIN_SDK_VERSION', '16'));
        console.log('hardcoding::: minSdkVersion ::: to 16 CordovaLib/src/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else {
          newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const buildGradle = fs.openSync(originalFile, 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(buildGradle, `${txt}\n`);
      });
      console.log(`updateCordovaLibBuildGradle hardcoded some android versions in  ${originalFile}`);
      updateAppBuildGradle();
    });
  });
};

const updateAppBuildGradle = () => {
  const originalFile = './platforms/android/app/build.gradle';
  const saveOffFile = originalFile + '.previous'
  console.log(`Processing ${originalFile}`);
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
        newGradle.push(line.replace('cordovaConfig.SDK_VERSION', '30'));
        console.log('hardcoding::: targetSdkVersion ::: to 30 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('maxSdkVersion cordovaConfig.MAX_SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.MAX_SDK_VERSION', '30'));
        console.log('hardcoding::: maxSdkVersion ::: to 30 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
      } else if (line.includes('compileSdkVersion cordovaConfig.SDK_VERSION')) {
        newGradle.push(line.replace('cordovaConfig.SDK_VERSION', '31'));
        console.log('hardcoding::: compileSdkVersion ::: to 31 in android/app/build.gradle (Hack needed for cordova-android 10.1.1)');
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


// Inline code follows
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

console.log('__dirname', __dirname);

if (!__dirname.endsWith('/WeVoteCordova')) {
  console.log('buildSymLinks must be run from the weVoteCordova directory');
  process.exit();
}


const { existsSync, symlink, unlinkSync } = fs;

const iosDir = path.join(__dirname, 'platforms/ios/www/');
const androidDir = path.join(__dirname, 'platforms/android/app/src/main/assets/www/');
const androidCss = androidDir + 'css';
if (existsSync(androidCss)) {
  rimraf(androidCss, () => console.log('rmdir: ' + androidCss));
}
const iosCss = iosDir + 'css';
if (existsSync(iosCss)) {
  rimraf(iosCss, () => console.log('rmdir: ' + iosCss));
}
const androidImg = androidDir + 'img';
if (existsSync(androidImg)) {
  rimraf(androidImg, () => console.log('rmdir: ' + androidImg));
}
const iosImg = iosDir + 'img';
if (existsSync(iosImg)) {
  rimraf(iosImg, () => console.log('rmdir: ' + iosImg));
}
const AndroidIndex = androidDir + 'index.html';
if (existsSync(AndroidIndex)) {
  unlinkSync(AndroidIndex);
  console.log('unlink: android index.html');
}
const iosIndex = iosDir + 'index.html';
if (existsSync(iosIndex)) {
  unlinkSync(iosIndex);
  console.log('unlink: ios index.html');
}
const androidBundle = androidDir + 'bundle.js';
if (existsSync(androidBundle)) {
  unlinkSync(androidBundle);
  console.log('unlink: android bundle.js');
}
const androidBundleMap = androidDir + 'bundle.js.map';
if (existsSync(androidBundleMap)) {
  unlinkSync(androidBundleMap);
  console.log('unlink: android bundle.js.map');
}
const iosBundle = iosDir + 'bundle.js';
if (existsSync(iosBundle)) {
  unlinkSync(iosBundle);
  console.log('unlink: iosDir bundle.js');
}
const iosBundleMap = iosDir + 'bundle.js.map';
if (existsSync(iosBundleMap)) {
  unlinkSync(iosBundleMap);
  console.log('unlink: iosDir bundle.js.map');
}

setTimeout( () => {
  console.log('sleep for 1');
  fs.readdir(iosDir, function(err, items) {
    console.log(items);
 });
  symlink(webAppPath + 'bundle.js', androidDir + 'bundle.js', err => console.log(err ? err : 'ln android bundle.js successful'));
  symlink(webAppPath + 'bundle.js', iosDir + 'bundle.js', err => console.log(err ? err : 'ln ios bundle.js successful'));

  symlink(webAppPath + 'bundle.js.map', androidDir + 'bundle.js.map', err => console.log(err ? err : 'ln android bundle.js.map successful'));
  symlink(webAppPath + 'bundle.js.map', iosDir + 'bundle.js.map', err => console.log(err ? err : 'ln ios bundle.js.map successful'));

  symlink(webAppPath + 'css', androidDir + 'css', err => console.log(err ? err : 'ln android css successful'));
  symlink(webAppPath + 'css', iosDir + 'css', err => console.log(err ? err : 'ln ios css successful'));

  symlink(webAppPath + 'img', androidDir + 'img', err => console.log(err ? err : 'ln android img successful'));
  symlink(webAppPath + 'img', iosDir + 'img', err => console.log(err ? err : 'ln ios img successful'));

  symlink(__dirname + '/www/index.html', androidDir + 'index.html', err => console.log(err ? err : 'ln android index.html successful'));
  symlink(__dirname + '/www/index.html', iosDir + 'index.html', err => console.log(err ? err : 'ln ios index.html successful'));

  // ln -s /Users/stevepodell/WebstormProjects/WebApp/build/bundle.js.map bundle.js.map

  // we now do this via config.xml, which is much better
  // copyFile("res/google/google-services.json", "platforms/android/app/google-services.json",
  //   err => console.log(err ? err : 'cp android google-services.json successful'));

  updateGradleProperties();

  fs.readdir(iosDir, function(err, items) {
    console.log(items);
  });

}, 10000);

