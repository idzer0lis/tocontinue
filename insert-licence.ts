/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */

/*Script used to insert avaya licence text into files if there isnt any licence text at the beggining of the file*/

const fs = require('fs');
const path = require('path');
let folderPath = './src';

let textToInsert = new Buffer(`/**
 * Avaya Inc. - Proprietary (Restricted)
 * Solely for authorized persons having a need to know pursuant to Company instructions.
 *
 * Copyright © Avaya Inc. All rights reserved.
 *
 * THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
 * The copyright notice above does not evidence any actual or intended publication of such source code.
 */\n`);

let textToInsertHTML = new Buffer(`<!--
* Avaya Inc. - Proprietary (Restricted)
* Solely for authorized persons having a need to know pursuant to Company instructions.
*
* Copyright © Avaya Inc. All rights reserved.
*
* THIS IS UNPUBLISHED PROPRIETARY SOURCE CODE OF Avaya Inc.
* The copyright notice above does not evidence any actual or intended publication of such source code.
-->\n`);

// Walk thru a directory recursive and make a list of files
let walk = function(dir, done) {
  let results = [];
  fs.readdir(dir, function(err, list) {
    if (err) { return done(err); }
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) { return done(null, results); }
      file = dir + '/' + file;
      fs.stat(file, function(err, stat) {
        if (err) { console.log(err); }
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            if (err) { console.log(err); }
            results = results.concat(res);
            next();
          });
        } else {
          results.push(file);
          next();
        }
      });
    })();
  });
};

walk(folderPath, function(err, results) {
  if (err) { throw err; }
  results.forEach(file => {
    let extension = path.extname(file);
    if (
      extension === '.js' ||
      extension === '.ts' ||
      extension === '.css' ||
      extension === '.scss'
    ) {
      let data = fs.readFileSync(file); // read existing contents into data
      // check if contents already have the licence text
      let firstLine = data.toString('utf8').split('\n')[0].trim();
      if (!firstLine.includes('/**')) {
        let fd = fs.openSync(file, 'w+');
        fs.writeSync(fd, textToInsert, 0, textToInsert.length, 0, 'utf8'); // write new data
        fs.writeSync(fd, data, 0, data.length, textToInsert.length, 'utf8'); // append old data
        fs.close(fd);
        console.log('Inserted licence text in: ', file);
      }
    } else if (extension === '.html') {
      let data = fs.readFileSync(file); // read existing contents into data
      // check if contents already have the licence text
      let firstLine = data.toString('utf8').split('\n')[0].trim();
      if (!firstLine.includes('<--')) {
        let fd = fs.openSync(file, 'w+');
        fs.writeSync(fd, textToInsertHTML, 0, textToInsertHTML.length, 0, 'utf8'); // write new data
        fs.writeSync(fd, data, 0, data.length, textToInsertHTML.length, 'utf8'); // append old data
        fs.close(fd);
        console.log('Inserted licence text in: ', file);
      }
    }
  });
});
