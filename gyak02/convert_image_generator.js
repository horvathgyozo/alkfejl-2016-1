"use strict";


const fs = require('fs');
const jimp = require('jimp');
const DataStore = require('nedb-promise');
const co = require('co');

const path = 'gyak02/images/';
const db = new DataStore({
  filename: 'images.nedb',
  autoload: true,
});

function readdir(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (err, files) {
      if (err) {
        reject(err)
      } else {
        resolve(files);
      }
    });
  });
}

co(function* () {
  const numRemoved = yield db.remove({}, {multi: true});
  console.log(numRemoved, 'törölve');
  const files = yield readdir(path);
  // for (let fileName of files) {
  files.forEach(co.wrap(function* (fileName) {
    const image = yield jimp.read(path + fileName);
    const {width, height} = image.bitmap;
    const insertedImage = yield db.insert({fileName, width, height});
    image.resize(100, jimp.AUTO);
    image.write(`gyak02/converted/${insertedImage._id}.png`);
    console.log(fileName, 'atmeretezve es kiirva')
  }));
  console.log('VEGE');
})

  // .catch(function (err) {
  //   console.log(err);
  // })



