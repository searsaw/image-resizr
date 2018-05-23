Image Resizr
============

A simple script for resizing an image. It uses a single decrease multiplier to automatically create the sizes instead of them being hardcoded. For example, a `DECREASE_MULTIPLIER` of `0.8` will make the image width and height be 80% of what it was before.

This script makes a few assumptions. The image should be a square image. Also, the default minimum size image is 50px.

## Setup

To setup the project, simply clone the repo and install the dependencies.

```bash
git clone https://github.com/searsaw/image-resizr.git
cd image-resizr
yarn
```

## Usage

To use it, simply invoke the script using `node` and pass an argument that is the path to the file to be resized. It will resize it into the images directory by default.

```bash
node image-resizr.js path/to/image.png
```
