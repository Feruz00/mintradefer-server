const multer = require('multer');
const fs = require('fs');
const path = require('path');

const fileCreate = (url) => {
  if (!fs.existsSync(url)) {
    fs.mkdirSync(url);
  }
};

const folderToCreate = (i) => {
  let uploadDirectory = './uploads';
  const year = new Date().getFullYear(),
    month = new Date().getMonth(),
    day = new Date().getDate();
  fileCreate(`${uploadDirectory}`);
  fileCreate(`${uploadDirectory}/${i}`);
  fileCreate(`${uploadDirectory}/${i}/${year}`);
  fileCreate(`${uploadDirectory}/${i}/${year}/${month}`);
  fileCreate(`${uploadDirectory}/${i}/${year}/${month}/${day}`);
  return `${uploadDirectory}/${i}/${year}/${month}/${day}`;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url;

    if (file.mimetype.startsWith('image/')) {
      url = folderToCreate('image');
    } else if (file.mimetype.startsWith('audio/')) {
      url = folderToCreate('audio');
    } else if (file.mimetype.startsWith('video/')) {
      url = folderToCreate('video');
    } else if (
      [
        'application/pdf', // PDF
        'application/msword', // DOC
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
        'application/vnd.ms-excel', // XLS
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLSX
      ].includes(file.mimetype)
    ) {
      url = folderToCreate('document');
    } else {
      return cb(
        new Error(
          'Invalid file type. Only images, audio, video, and documents (PDF, Word, Excel) are allowed.'
        )
      );
    }

    cb(null, url);
  },
  filename: function (req, file, cb) {
    const encodedFilename = Buffer.from(file.originalname, 'latin1')
      .toString('utf8')
      .split(' ')
      .join('_');
    cb(null, Date.now() + '-' + encodedFilename);
  },
});

const fileFilter = (req, file, cb) => {
  cb(null, true);
};

// **Multer Options**
const multerOptions = multer({
  storage: storage,
  fileFilter: fileFilter,
  // limits: { fileSize: 10 * 1024 * 1024 } // 10MB file size limit
});

module.exports = multerOptions;
