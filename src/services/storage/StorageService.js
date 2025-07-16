/* eslint-disable no-underscore-dangle */
const fs = require('fs');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    // Synchronously creates a directory.
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, meta) {
    const filename = +new Date() + meta.filename; // creates a file with it's upload timestamp
    const path = `${this._folder}/${filename}`;

    // creates a writable stream on the specified path
    const fileStream = fs.createWriteStream(path);

    // the function below is a asynchronous function
    return new Promise((resolve, reject) => {
      // When an error occurs, this will be returned, which consists of error details
      fileStream.on('error', (error) => reject(error));

      // When there's no error, the filename will be returned, and the file will be added
      // to the specified directory
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
