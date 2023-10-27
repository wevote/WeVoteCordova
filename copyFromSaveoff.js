//Program to copy files from the saveoff source control files into the newly created WeVoteCordova directory
/*jshint esversion: 6 */
/*jslint node: true */
/*global process, __dirname */
const path = require('path');
const fs = require('fs-extra');
const { rimrafSync } = require('rimraf');

console.log('__dirname', __dirname);

if (!__dirname.endsWith('/WeVoteCordovaSaveoff')) {
  console.log('copyFromSaveoff must be run from the WeVoteCordovaSaveoff directory');
  process.exit();
}

if (!fs.existsSync('../WeVoteCordova')) {
  console.log('copyFromSaveoff must have a destination WeVoteCordova directory to copy from.  Did you run "cordova create  WeVoteCordova us.wevote.wevotecordova WeVoteCordova"?');
  process.exit();
}

const destinationDir = path.join(__dirname, "../WeVoteCordova");

fs.copy(path.resolve(__dirname,'./res'), path.resolve(destinationDir, './res'), function(error) {
  if (error) {
    console.log('Failed to copy the res dir', error);
  } else {
    console.log("Copied the /res dir from ../WeVoteCordovaSaveoff");
  }
});

fs.copy(path.resolve(__dirname, './docs'), path.resolve(destinationDir, './docs'), function(error) {
  if (error) {
    console.log('Failed to copy the docs dir', error);
  } else {
    console.log("Copied the /docs dir from ../WeVoteCordovaSaveoff");
  }
});

console.log('dest dir ', path.resolve(destinationDir, './www'));
if (fs.existsSync(path.resolve(destinationDir, './www'))) {
  console.log('after if exists')
  rimrafSync('../WeVoteCordova/www');
  console.log('Removed scaffolding directory:  WeVoteCordova/www')
  fs.mkdir(path.resolve(destinationDir, './www'), (err) => {
    if (err) {
      return console.error(err);
    }
    console.log('../WeVoteCordova/www Directory created successfully');
    const filesToCopy = ['./config.xml','./www/index.html', './.gitignore', './buildSymLinks.js', './copyFromSaveoff.js', './package.json', './package-lock.json','README.md'];

    filesToCopy.forEach(file => {
      // console.log(path.resolve(__dirname, file), ' -------------> ', path.resolve(destinationDir, file) );
      fs.copy(path.resolve(__dirname, file), path.resolve(destinationDir, file), (err) => {
        if (err) {
          console.error('Failed to copy ', err);
        } else {
          console.log(file + ' copied successfully');
        }
      });
    });
  });
}
