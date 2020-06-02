const fs = require('fs');
const path = require('path');

/**
 * Create full path directory.
 *
 * @see {@link https://stackoverflow.com/a/40686853/}
 *
 * @param {String} targetDir
 * @param {Boolean} param.isRelativeToScript
 *
 * @example
 *
 * // Default, make directories relative to current working directory.
 * createDirByPathSync('path/to/dir');
 *
 * // Make directories relative to the current script.
 * createDirByPathSync('path/to/dir', {isRelativeToScript: true});
 *
 * // Make directories with an absolute path.
 * createDirByPathSync('/path/to/dir');
 *
 */
function createDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);

    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      // curDir already exists
      if (err.code === 'EEXIST') {
        return curDir;
      }

      // To avoid `EISDIR` error on Mac
      // and `EACCES`-->`ENOENT` and `EPERM` on Windows
      // Throw the original parentDir error on curDir `ENOENT` failure
      if (err.code === 'ENOENT') {
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }

      const caughtErr = ['EACCES', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;

      if (!caughtErr || caughtErr && curDir === path.resolve(targetDir)) {
        // Throw if it's just the last created dir
        throw err;
      }
    }

    return curDir;
  }, initDir);
}

module.exports = createDirByPathSync;
