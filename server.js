const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Test route to verify server is running
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port  http://localhost:${PORT}`);
});
