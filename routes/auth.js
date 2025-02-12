const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Mock database (for illustration purposes)
const users = [];

// Register Route (POST /api/auth/register)
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;

  // Check if the user exists
  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).send("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user and store it in the "database"
  const newUser = { username, password: hashedPassword, role };
  users.push(newUser);

  res.status(201).send("User registered successfully");
});

// Login Route (POST /api/auth/login)
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Find the user in the mock "database"
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(400).send("User not found");
  }

  // Compare the password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).send("Invalid password");
  }

  // Generate a JWT token
  const token = jwt.sign(
    { username: user.username, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({ token });
});

// Test Route (GET /api/auth/test)
router.get("/test", (req, res) => {
  res.send("Auth route working!");
});

// Protected Route (GET /api/auth/admin) - Admin Only
router.get("/admin", (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(403).send("Access denied, no token provided");

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send("Invalid token");

    // Check if the user has 'admin' role
    if (decoded.role !== "admin") {
      return res.status(403).send("Access denied, insufficient privileges");
    }

    res.send("Welcome Admin, you have access to this route");
  });
});

module.exports = router;
