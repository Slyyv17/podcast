const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);

    if (decoded.role !== 'user') {
      return res.status(403).json({ message: 'Forbidden: Not a user.' });
    }

    req.user = decoded;
    next();

  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyUser;