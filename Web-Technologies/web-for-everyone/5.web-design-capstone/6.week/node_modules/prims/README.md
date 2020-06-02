# Prims

![downloads-badge](https://img.shields.io/npm/dt/prims.svg)

A program built on top of [sharp](https://github.com/lovell/sharp) to batch processing images from an input directory. A simple way to generate [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).

- Process multiple images.
- Convert to `jpeg`, `png`, `webp`, `tiff`.
- Resize to a list of specified widths and heights.
- Fit image (cover, contain, fill, inside, outside).
- Preserve or remove image metadata.
- Customize naming convention.
- Optional interactive CLI.
- Lightweight (sharp is the only dependency).
- Runs in nodejs v8 and up.

## Install

`npm install --save-dev prims`

You can also install the optional [prims-cli](https://github.com/pldg/prims/blob/master/packages/prims-cli).

## Quick Start

```js
const prims = require('prims');

prims({
  input: path.resolve(__dirname, './images'),
  convert: {
    jpeg: {
      quality: 70
    },
    webp: {
      quality: 60
    }
  },
  resize: {
    widths: [ 400, 800 ]
  }
});
```

- Read files inside `images` folder.
- Convert images to [`jpeg`](http://sharp.pixelplumbing.com/en/stable/api-output/#jpeg) at 70% quality and to [`webp`](http://sharp.pixelplumbing.com/en/stable/api-output/#webp) at 60% quality.
- Each converted images will also be [resized](http://sharp.pixelplumbing.com/en/stable/api-resize/) to the selected `resize.widths`.
- Because `resize.heights` is omitted, height for each image is calculated automatically to preserve aspect ratio.
- Output all processed images to `./images/processed-images/`.

Output:

- `[name]_400w.jpeg`
- `[name]_400w.webp`
- `[name]_800w.jpeg`
- `[name]_800w.webp`

## Examples

Go to [examples](https://github.com/pldg/prims/blob/master/packages/prims/doc/examples.md) page.

## API

Go to [api](https://github.com/pldg/prims/blob/master/packages/prims/doc/api.md) page.

## Test locally

`yarn run test`

See [tests](https://github.com/pldg/prims/tree/master/packages/prims/tests) folder.

## Contribution

Contributions are welcome.
