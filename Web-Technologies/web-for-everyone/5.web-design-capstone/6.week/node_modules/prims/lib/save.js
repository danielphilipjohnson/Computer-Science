const generateOutputPath = require('./generate-output-path');
const logInfo = require('./log-info');

async function save(ctx) {
  try {
    const { image, log } = ctx;

    const { info } = await image.toBuffer({ resolveWithObject: true });

    ctx = { info, ...ctx };

    await image.toFile(generateOutputPath(ctx));

    if (log) logInfo(ctx);
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = save;
