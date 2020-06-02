# API

```js
{
  input: String,
  match: /Regex/,
  output: String,
  convert: {
    jpeg: Object,
    webp: Object,
    png: Object,
    tiff: Object
    /*
     * Format objects are the same as Sharp documentation,
     * inside each extension object you can use the same
     * properties / methods listed here:
     * http://sharp.pixelplumbing.com/en/stable/api-output/
     */
  },
  resize: {
    widths: Number[],
    heights: Number[]
    /*
     * You can use other Sharp resize options:
     * http://sharp.pixelplumbing.com/en/stable/api-resize/#resize
     */
  },
  naming: {
    separator: String,
    width: Boolean,
    height: Boolean
  },
  withMetadata: Boolean,
  log: Boolean
}
```

| Optional param | Type | Description | Default
| --- | --- | --- | --- |
| options | `Object` | List of options | `undefined` set all options to their defaults |
| options.input | `String` | Absolute path to input folder | `process.cwd()` |
| options.match | `Regex` | Load only files that match regex | `undefined` |
| options.output | `String` | Absolute path to output folder | `path.join(input, 'processed-images')` |
| options.convert | `Object` | List of [output formats](http://sharp.pixelplumbing.com/en/stable/api-output/#toformat) and their quality | `undefined` use same format of the image with default Sharp quality |
| options.resize | `Object` | Accept Sharp [resize options](http://sharp.pixelplumbing.com/en/stable/api-resize/#parameters) object, but `width` is substituted with `widths` array and `height` is substituted with `heights` array | `undefined` do not resize |
| options.resize.widths | `Number[]` | Image will be resized to those widths in px (aspect ratio is preserved if `heights` is omitted) | `undefined` do not resize width |
| options.resize.heights | `Number` | Image will be resized to those heights in px (aspect ratio is preserved if `widths` is omitted) | `undefined` do not resize height |
| options.naming | `Object` | Change naming convention. | `undefined` default to `[name]_[width]w_[height]h.[ext]` |
| options.naming.separator | `String` | Choose a char to separate image name from its dimensions | Underscore `_` |
| options.naming.width | `Boolean` | Output width dimension `[width]w` | `undefined` do not output width unless `options.resize.widths` is used |
| options.naming.height | `Boolean` | Output height dimension `[height]h` | `undefined` do not output height unless `options.resize.heights` is used |
| options.withMetadata| `Boolean` | If `true` image metadata will be preserved | `false` |
| options.log | `Boolean` | Log info in console for each image | `false` |
