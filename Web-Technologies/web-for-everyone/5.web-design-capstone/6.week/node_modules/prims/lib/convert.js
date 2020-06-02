function convertToFormats(ctx) {
  const { image, convert } = ctx;
  const convertedImages = [];

  for (const format of Object.keys(convert)) {
    const options = convert[format];

    const converted = image
      .toFormat(format, options)
      .clone();

    convertedImages.push(converted);
  }

  return convertedImages;
}

function convertToInputExtension(ctx) {
  const { ext, image } = ctx;

  return image.toFormat(ext);
}

module.exports = {
  convertToFormats,
  convertToInputExtension
};
