const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // ✅ Allow tokens with or without "Bearer "
  if (token.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secrets-keys');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authenticate;
