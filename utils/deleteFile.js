const fs = require('fs').promises;

const deleteFile = async (path) => {
  if (!path) return;
  try {
    await fs.unlink(path);
    console.log(`Deleted file: ${path}`);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Failed to delete file: ${path}`, err);
      throw err;
    }
  }
};
module.exports = { deleteFile };
