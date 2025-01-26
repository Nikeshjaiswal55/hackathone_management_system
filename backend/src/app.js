const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
// connect to mongoDB
connectDB();
const app = express();
app.use(cors());

app.use(express.json());

// Routes
const authRoutes = require("./modules/user/routes/auth.routes");
const userRoutes = require("./modules/user/routes/user.routes");
const hackathonRoutes = require("./modules/hackathons/routes/hackathon.routes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/", hackathonRoutes);

module.exports = app;
