const path = require("path");
const fs = require('fs-extra')

fs.removeSync('src/assets/img/processed-images'); 

const prims = require("prims");


prims({
    input: path.resolve(__dirname, "src/assets/img"),
    convert: {
      png: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    },
    resize: {
      widths: [400, 600, 800, 1600],
    },
  });
console.log("ended")
