"use strict";


const fs = require('fs');
const jimp = require('jimp');
const DataStore = require('nedb-promise');

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

function processFile(fileName) {
  let theImage;
  return jimp.read(path + fileName)
    .then(function (image) {
      theImage = image;
      const {width, height} = image.bitmap;
      return db.insert({fileName, width, height});
    })
    .then(function (insertedImage) {
      theImage.resize(100, jimp.AUTO);
      return theImage.write(`gyak02/converted/${insertedImage._id}.png`);
    })
    .then(function () {
      console.log(fileName, 'atmeretezve es kiirva')
    });
}

db.remove({}, {multi: true})
  .then(function (numRemoved) {
    console.log(numRemoved, 'törölve');
    return;
  })
  .then(function () {
    return readdir(path);
  })
  .then(function (files) {
    return Promise.all(files.map(processFile));
  })
  .then(function () {
    console.log('VEGE')
  })
  .catch(function (err) {
    console.log(err);
  })



