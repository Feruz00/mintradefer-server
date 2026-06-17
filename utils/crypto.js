const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

// Must be 32 bytes
const key = crypto
  .createHash('sha256')
  .update(process.env.ENCRYPTION_KEY)
  .digest();

// Must be 16 bytes
const iv = Buffer.from(process.env.ENCRYPTION_IV, 'hex');

const encrypt = (text) => {
  if (!text) return null;

  const cipher = crypto.createCipheriv(algorithm, key, iv);

  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return encrypted;
};

const decrypt = (encryptedText) => {
  if (!encryptedText) return null;

  const decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
};

module.exports = {
  encrypt,
  decrypt,
};
