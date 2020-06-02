const validFormats = require('./valid-formats');

function isInputExtensionValid(ctx) {
  const { name, ext } = ctx;
  const formatIsValid = validFormats.indexOf(ext) > -1;

  if (formatIsValid) {
    return true;
  } else {
    console.warn(`Warning: Invalid extension: File not processed: ${name}.${ext}`);
  }
}

module.exports = isInputExtensionValid;
