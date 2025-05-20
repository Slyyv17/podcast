const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Access denied, no token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Access denied, token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Not an admin' });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyAdmin;