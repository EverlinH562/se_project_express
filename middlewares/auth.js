const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');
const { HTTP_STATUS } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .send({ message: 'Authorization required' });
  }

  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'Authorization required' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next(); 
  } catch (err) {
    return res.status(401).send({ message: 'Invalid token' });
  }
};