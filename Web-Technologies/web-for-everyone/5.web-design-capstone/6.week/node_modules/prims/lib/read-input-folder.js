const readFiles = require('./utils/read-files');

async function readInputFolder(input, match) {
  try {
    let files = await readFiles(input);

    files = files
      .filter(file => {
        const isFolder = file === undefined;

        if (match) {
          return !isFolder && match.test(`${file.name}.${file.ext}`);
        } else {
          return !isFolder;
        }
      })
      .map(file => file);

    return files;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = readInputFolder;