const express = require("express");
const usersRoutes = require("./routes/users"); // ✅ Ensure correct path
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/users", usersRoutes); // ✅ Make sure this matches what you're calling in Postman

// Default route for unmatched endpoints
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
