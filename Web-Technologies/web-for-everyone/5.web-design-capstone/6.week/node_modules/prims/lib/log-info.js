let count = 1;

function logInfo(ctx) {
  const { image, info } = ctx;
  const { width, height, format, size } = info;

  const processed_image_info = {
    inputPath: image.options.input.file,
    outputPath: image.options.fileOut,
    format,
    width,
    height,
    size,
    n: count++
  };

  console.log(processed_image_info);
}

module.exports = logInfo;
