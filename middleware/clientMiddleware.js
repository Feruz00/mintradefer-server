const addClient = (req, res, next) => {
  req.clientSide = true;
  next();
};
module.exports = { addClient };
