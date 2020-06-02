const sharp = require('sharp');
const { isObjectLiteralEmpty } = require('./utils/is');
const {
  convertToFormats,
  convertToInputExtension
} = require('./convert');
const resizes = require('./resizes');
const save = require('./save');

async function runSharp(ctx) {
  const { filepath, withMetadata, convert, resize } = ctx;

  ctx.image = sharp(filepath);

  if (withMetadata) ctx.image.withMetadata();

  const have_convert = !isObjectLiteralEmpty(convert);
  const have_resize = !isObjectLiteralEmpty(resize);

  /**
   *
   * Each time an image is processed using *convert.js* or *resizes.js*
   * a new instance of Sharp is created:
   *
   * - [clone method](http://sharp.pixelplumbing.com/en/stable/api-input/#clone)
   *
   * This newly created Sharp instance is saved inside a "processedImages" array.
   *
   * We loop through "processedImages" array, and we save each processed image
   * inside `ctx.image`.
   *
   * We use `ctx.image` to chain other Sharp processing, for example an image
   * can be:
   *
   * - converted AND resized
   * - OR converted
   * - OR resized
   *
   * The chain of the processing depend on user input.
   *
   * Finally we use *save.js* to save the processed image to a file.
   *
   * The saved image follow this naming convention:
   *
   * - `${name}_${width}w_${height}h.${format}`
   *
   * This procedure is done for each combination of
   * `resize.widths`, `resize.heights` and `convert` formats
   * as well as for each image in the input directory.
   *
   */

  if (have_convert && have_resize) {
    for (const converted of convertToFormats(ctx)) {
      ctx.image = converted;

      for (const resized of resizes(ctx)) {
        ctx.image = resized;

        await save(ctx);
      }
    }
  } else if (have_convert && !have_resize) {
    for (const converted of convertToFormats(ctx)) {
      ctx.image = converted;

      await save(ctx);
    }
  } else if (!have_convert && have_resize) {
    for (const resized of resizes(ctx)) {
      ctx.image = resized;

      await save(ctx);
    }
  } else {
    ctx.image = convertToInputExtension(ctx);

    await save(ctx);
  }
}

module.exports = runSharp;
