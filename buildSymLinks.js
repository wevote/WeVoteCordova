//Program to build the symlinks from WeVoteCordova www directories to the the WebApp build directory
/*jshint esversion: 6 */
/*jslint node: true */
/*global process, __dirname */
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const readline = require('readline');

const updateGradleProperties = () => {
  fs.rename('./platforms/android/gradle.properties', './platforms/android/gradle.original', () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('./platforms/android/gradle.original'),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.startsWith('android.useAndroidX')) {
        console.log('adding::: android.useAndroidX=true ::: to android/gradle.properties');
        newGradle.push('android.useAndroidX=true');
      } else if (line.startsWith('android.enableJetifier')) {
        console.log('adding::: android.enableJetifier=true ::: to android/gradle.properties');
        console.log('adding::: android.enableJetifier=true ::: to android/gradle.properties');

        newGradle.push('android.enableJetifier=true');
      } else {
        newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const gradleProperties = fs.openSync('./platforms/android/gradle.properties', 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(gradleProperties, `${txt}\n`);
      });
      console.log(`updateGradleProperties changed settings in ./platforms/android/gradle.properties`);
    });
  });
};

const updateProjectBuildGradle = () => {
  fs.rename( './platforms/android/build.gradle', './platforms/android/projectBuildGradle.original', () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('./platforms/android/projectBuildGradle.original'),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.startsWith('        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin')) {
        newGradle.push(line);

        console.log('adding::: classpath \'com.google.gms:google-services:4.3.3\' ::: to android/build.gradle');

        newGradle.push('        classpath \'com.google.gms:google-services:4.3.3\'');
      } else {
        newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const buildGradle = fs.openSync('./platforms/android/build.gradle', 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(buildGradle, `${txt}\n`);
      });
      console.log('updateProjectBuildGradle added a classpath in ./platforms/android/build.gradle');
    });
  });
};

const updateAppBuildGradle = () => {
  fs.rename( './platforms/android/app/build.gradle', './platforms/android/app/appBuildGradle.original', () => {
    const rl = readline.createInterface({
      input: fs.createReadStream('./platforms/android/app/appBuildGradle.original'),
      crlfDelay: Infinity,
    });
    const newGradle = [];
    rl.on('line', (line) => {
      if (line.startsWith('apply plugin: \'com.android.application\'')) {
        newGradle.push(line);
        console.log('adding::: apply plugin: \'com.google.gms.google-services\' ::: to android/app/build.gradle');
        newGradle.push('apply plugin: \'com.google.gms.google-services\'');
      } else if (line.startsWith('    implementation fileTree(dir: \'libs\', include: \'*.jar\')')) {
        newGradle.push(line);
        console.log('adding::: implementation \'com.google.firebase:firebase-analytics:17.5.0\' ::: to android/app/build.gradle');
        newGradle.push('    implementation \'com.google.firebase:firebase-analytics:17.5.0\'');
        console.log('adding::: implementation \'androidx.browser:browser:1.2.0\' ::: to android/app/build.gradle');

        newGradle.push('    implementation \'androidx.browser:browser:1.2.0\'');
      } else {
        newGradle.push(line);
      }
    });
    rl.on('close', () => {
      const buildGradle = fs.openSync('./platforms/android/app/build.gradle', 'w');

      newGradle.forEach((txt) => {
        fs.writeSync(buildGradle, `${txt}\n`);
      });
      console.log('updateAppBuildGradle add an implementation in ./platforms/android/app/build.gradle');
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
const iosBundle = iosDir + 'bundle.js';
if (existsSync(iosBundle)) {
  unlinkSync(iosBundle);
  console.log('unlink: iosDir bundle.js');
}

setTimeout( () => {
  symlink(webAppPath + 'bundle.js', androidDir + 'bundle.js', err => console.log(err ? err : 'ln android bundle.js successful'));
  symlink(webAppPath + 'bundle.js', iosDir + 'bundle.js', err => console.log(err ? err : 'ln ios bundle.js successful'));

  symlink(webAppPath + 'css', androidDir + 'css', err => console.log(err ? err : 'ln android css successful'));
  symlink(webAppPath + 'css', iosDir + 'css', err => console.log(err ? err : 'ln ios css successful'));

  symlink(webAppPath + 'img', androidDir + 'img', err => console.log(err ? err : 'ln android img successful'));
  symlink(webAppPath + 'img', iosDir + 'img', err => console.log(err ? err : 'ln ios img successful'));

  symlink(__dirname + '/www/index.html', androidDir + 'index.html', err => console.log(err ? err : 'ln android index.html successful'));
  symlink(__dirname + '/www/index.html', iosDir + 'index.html', err => console.log(err ? err : 'ln ios index.html successful'));

  // we now do this via config.xml, which is much better
  // copyFile("res/google/google-services.json", "platforms/android/app/google-services.json",
  //   err => console.log(err ? err : 'cp android google-services.json successful'));


  updateGradleProperties();
  updateProjectBuildGradle();
  updateAppBuildGradle();
}, 1000);

