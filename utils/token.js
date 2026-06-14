const jwt = require('jsonwebtoken');

const generateToken = (data, hours) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, {
    // expiresIn: `${expiresInDays}d`, // custom expiration
    // expiresIn: hours * 60, // minute,
    expiresIn: `${hours}d`,
  });
  return token;
};
module.exports = { generateToken };
