# Examples

## Without options

```js
const prims = require('prims');

prims();
```

- If `input` option is not set, load files from current working directory (unsupported formats are automatically skipped).
- If `output` option is not set, output images to `path.join(process.cwd(), 'processed-images')` folder.
- If `convert` option is not set, compress images to [sharp defaults](http://sharp.pixelplumbing.com/en/stable/api-output/), preserving original format (`.jpg` images will be converted to `.jpeg`).
- If `resize` option is not set, do not resize images.

Output:

- `[name].[ext]`

## Input and output

```js
const prims = require('prims');

prims({
  input: path.resolve(__dirname, './images'),
  output: path.resolve(__dirname, './output_imgs'),
});
```

- Load files from `images` folder.
- Output images to `./output_imgs`.

Output:

- `[name].[ext]`

## Resize width

```js
const prims = require('prims');

prims({
  resize: {
    widths: [ 300, 700 ]
  }
});
```

- Because `resize.heights` is omitted, height for each image is calculated automatically to preserve aspect ratio.

Output:

- `[name]_300w.[ext]`
- `[name]_700w.[ext]`

## Naming

By default if you resize only the image width, the output name it'll contains only the width dimension, unless you set `options.naming.height` to `true`.

You can also choose a char separator with `options.naming.separator` to separate image name from its dimensions.

```js
const prims = require('prims');

prims({
  resize: {
    widths: [ 300, 700 ]
  },
  naming: {
    separator: '@',
    height: true
  }
});
```

Output:

- `[name]@300w@[height]h.[ext]`
- `[name]@700w@[height]h.[ext]`

## Resize height and width

```js
const prims = require('prims');

prims({
  resize: {
    widths: [ 300, 700 ],
    heights: [ 500, 900 ]
  }
});
```

- Images are [resized](http://sharp.pixelplumbing.com/en/stable/api-resize/) to all possible `widths` and `heights` combinations.

Output:

- `[name]_300w_500h.[ext]`
- `[name]_300w_900h.[ext]`
- `[name]_700w_500h.[ext]`
- `[name]_700w_900h.[ext]`

## Convert

```js
const prims = require('prims');

prims({
  convert: {
    png: {},
    webp: {}
  }
});
```

- Images are converted to [png](http://sharp.pixelplumbing.com/en/stable/api-output/#png) and [webp](http://sharp.pixelplumbing.com/en/stable/api-output/#webp) using Sharp default values.

Output:

- `[name].png`
- `[name].webp`

## Convert and resize

```js
const prims = require('prims');

prims({
  convert: {
    png: {
      compressionLevel: 3
    },
    webp: {
      quality: 60
    },
    jpeg: {
      quality: 70,
      progressive: true
    }
  },
  resize: {
    widths: [ 300, 700 ],
    heights: [ 500, 900 ],
    fit: 'fill'
  }
});
```

- Images are converted to [`png`](http://sharp.pixelplumbing.com/en/stable/api-output/#png) with a compression level of 3, to [`webp`](http://sharp.pixelplumbing.com/en/stable/api-output/#webp) with 60% quality, and to [`jpeg`](http://sharp.pixelplumbing.com/en/stable/api-output/#jpeg) at 70% quality using progressive scan.
- The converted images will also be [resized](http://sharp.pixelplumbing.com/en/stable/api-resize/) to all possible `widths` and `heights` combinations. Use `fill` to ignore the aspect ratio and stretch both provided dimensions.

Output:

- `[name]_300w_500h.jpeg`
- `[name]_300w_900h.jpeg`
- `[name]_700w_500h.jpeg`
- `[name]_700w_900h.jpeg`
- `[name]_300w_500h.png`
- `[name]_300w_900h.png`
- `[name]_700w_500h.png`
- `[name]_700w_900h.png`
- `[name]_300w_500h.webp`
- `[name]_300w_900h.webp`
- `[name]_700w_500h.webp`
- `[name]_700w_900h.webp`
