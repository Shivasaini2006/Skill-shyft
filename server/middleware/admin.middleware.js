const jwt = require('jsonwebtoken');
const pool = require('../config/database');

exports.verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // We should double check the DB just in case their role was revoked
    const connection = await pool.getConnection();
    const [users] = await connection.execute(
      'SELECT id, role FROM users WHERE id = ?',
      [decoded.id]
    );
    connection.release();

    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    const userRole = users[0].role;
    
    if (userRole !== 'admin' && userRole !== 'super_admin') {
      return res.status(403).json({ error: 'Forbidden. Admin privileges required.' });
    }

    req.user = decoded;
    req.user.role = userRole;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired.' });
    }
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
