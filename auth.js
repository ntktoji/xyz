const jwt = require('jsonwebtoken');

function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Authentication required' });
  try {
    req.admin = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
    return next();
  } catch {
    return res.status(401).json({ error: 'Session expired or invalid' });
  }
}

module.exports = { requireAdmin };

// Use after requireAdmin. ADMIN can do everything; STAFF is limited to the roles passed in.
function requireRole(...roles) {
  return (req, res, next) => (roles.includes(req.admin.role) ? next() : res.status(403).json({ error: 'You do not have permission to do this' }));
}
module.exports.requireRole = requireRole;
