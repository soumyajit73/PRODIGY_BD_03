const express = require("express");
const authMiddleware = require("../middleware/auth"); // ✅ Ensure correct import

const router = express.Router();

// Protected Route: Only Authenticated Users Can Access
router.get("/", authMiddleware, (req, res) => {
  res.json({ message: "You have access to user data", user: req.user });
});

module.exports = router;
