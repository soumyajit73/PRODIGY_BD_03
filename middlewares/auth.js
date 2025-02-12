const jwt = require("jsonwebtoken");

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).send("Token required");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = decoded; // Attach user info to the request
    next();
  });
};

// Role-based Authorization Middleware
const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send("Access denied");
    }
    next();
  };
};

module.exports = { verifyToken, authorizeRole };
