function resizes(ctx) {
  const { resize, image } = ctx;
  const { widths, heights } = resize;
  const resizedImages = [];

  if (widths && !heights) {
    for (const width of widths) {
      const resized = image
        .resize({ width, ...resize })
        .clone();

      resizedImages.push(resized);
    }
  }

  if (!widths && heights) {
    for (const height of heights) {
      const resized = image
        .resize({ height, ...resize })
        .clone();

      resizedImages.push(resized);
    }
  }

  if (widths && heights) {
    for (const width of widths) {
      for (const height of heights) {
        const resized = image
          .resize({ width, height, ...resize })
          .clone();

        resizedImages.push(resized);
      }
    }
  }

  return resizedImages;
}

module.exports = resizes;
