//Program to build the symlinks from WeVoteCordova www directories to the the WebApp build directory
/*jshint esversion: 6 */
/*jslint node: true */
/*global process, __dirname */
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');


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

const { unlinkSync, symlink } = fs;
const iosDir = path.join(__dirname, 'platforms/ios/www/');
const androidDir = path.join(__dirname, 'platforms/android/app/src/main/assets/www/');

rimraf(androidDir + 'css', () => console.log('rmdir: ' + androidDir + 'css'));
rimraf(iosDir + 'css', () => console.log('rmdir: ' + iosDir + 'css'));
rimraf(androidDir + 'img', () => console.log('rmdir: ' + androidDir + 'img'));
rimraf(iosDir + 'img', () => console.log('rmdir: ' + iosDir + 'img'));

try {
  unlinkSync(androidDir + 'index.html');
  console.log('unlink: android index.html');
} catch(err) {
  console.log(err);
}
try {
  unlinkSync(iosDir + 'index.html');
  console.log('unlink: ios index.html');
} catch(err) {
  console.log(err);
}
try {
  unlinkSync(androidDir + 'bundle.js');
  console.log('unlink: android bundle.js');
} catch(err) {
  console.log(err);
}
try {
  unlinkSync(iosDir + 'bundle.js');
  console.log('unlink: ios bundle.js');
} catch(err) {
  console.log(err);
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
}, 1000);
