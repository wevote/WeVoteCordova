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
const androidCss = androidDir + 'css';
if (fs.existsSync(androidCss)) {
  rimraf(androidCss, () => console.log('rmdir: ' + androidCss));
}
const iosCss = iosDir + 'css';
if (fs.existsSync(iosCss)) {
  rimraf(iosCss, () => console.log('rmdir: ' + iosCss));
}
const androidImg = androidDir + 'img';
if (fs.existsSync(androidImg)) {
  rimraf(androidImg, () => console.log('rmdir: ' + androidImg));
}
const iosImg = iosDir + 'img';
if (fs.existsSync(iosImg)) {
  rimraf(iosImg, () => console.log('rmdir: ' + iosImg));
}
const AndroidIndex = androidDir + 'index.html';
if (fs.existsSync(AndroidIndex)) {
  unlinkSync(AndroidIndex);
  console.log('unlink: android index.html');
}
const iosIndex = iosDir + 'index.html';
if (fs.existsSync(iosIndex)) {
  unlinkSync(iosIndex);
  console.log('unlink: ios index.html');
}
const androidBundle = androidDir + 'bundle.js';
if (fs.existsSync(androidBundle)) {
  unlinkSync(androidBundle);
  console.log('unlink: android bundle.js');
}
const iosBundle = iosDir + 'bundle.js';
if (fs.existsSync(iosBundle)) {
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
}, 1000);
