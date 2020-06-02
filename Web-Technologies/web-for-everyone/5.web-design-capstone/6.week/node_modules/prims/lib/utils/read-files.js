const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

/**
 * @param {String} dir Absolute path to directory.
 * @returns {Object[]} Each file is `{ name, ext, filepath }`.
 */
function readFiles(dir) {
  return readdir(dir, { encoding: 'utf8' })
    .then(filenames => {
      const files = getFiles(dir, filenames);

      return Promise.all(files);
    })
    .catch(err => console.error(err));
}

function getFiles(dir, filenames) {
  return filenames.map(filename => {
    const name = path.parse(filename).name;
    const ext = path.parse(filename).ext.match(/[^\.]*$/)[0].toLowerCase();
    const filepath = path.resolve(dir, filename);

    return getStat({ name, ext, filepath });
  });
}

function getStat({ name, ext, filepath }) {
  return stat(filepath)
    .then(stat => {
      const isFile = stat.isFile();

      if (isFile) return { name, ext, filepath };
    })
    .catch(err => console.error(err));
}

module.exports = readFiles;
