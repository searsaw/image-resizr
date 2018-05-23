const { ensureDir } = require('fs-extra');
const { basename, resolve } = require('path');
const sharp = require('sharp');

const {
  MIN_IMAGE_SIZE = '50',
  DECREASE_MULTIPLIER = '0.8',
  OUTPUT_DIRECTORY = 'images',
} = process.env;

const imagePath = process.argv[2];
const imageName = basename(imagePath);
const image = sharp(imagePath);

const getResizedFilename = (name, length) => {
  const lastIndex = name.lastIndexOf('.');

  return `${name.substring(0, lastIndex)}-${length}x${length}${name.substring(lastIndex)}`;
};

const processImages = async (metadata) => {
  const { width } = metadata;
  const imagesDir = resolve(__dirname, OUTPUT_DIRECTORY);
  let sideLength = width;

  await ensureDir(imagesDir);

  const resizeOperations = [];
  while (sideLength > MIN_IMAGE_SIZE * 1) {
    const resizeOperation = image.clone()
      .resize(sideLength, sideLength)
      .toFile(resolve(imagesDir, getResizedFilename(imageName, sideLength)));

    resizeOperations.push(resizeOperation);
    sideLength = Math.floor(sideLength * DECREASE_MULTIPLIER);
  }

  return Promise.all(resizeOperations);
};

image.metadata()
  .then(processImages)
  .then(() => console.log('Images have been resized into the "images" directory.'))
  .catch(err => console.log('err', err));
