const path = require('path');

function setOptions(options = {}) {
  if (!options.input) options.input = process.cwd();

  if (!options.output) options.output = path.join(options.input, 'processed-images');

  if (options.input === options.output) {
    throw new Error('"input" can\'t be equal to "output"');
  }

  if (!options.match) options.match = false;

  if (!options.convert) options.convert = {};

  if (!options.resize) options.resize = {};

  if (!options.naming) options.naming = {};

  if (!options.naming.separator) options.naming.separator = '_';

  if (options.resize.widths) options.naming.width = true;

  if (options.resize.heights) options.naming.height = true;

  if (!options.withMetadata) options.withMetadata = false;

  if (!options.log) options.log = false;

  return options;
}

module.exports = setOptions;