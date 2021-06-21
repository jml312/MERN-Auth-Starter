const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const connectDB = require("./config/db.js");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Initialize middleware
app.use(helmet());
app.use(morgan("dev"));
app.use(cors({ origin: process.env.ORIGIN_URL }));
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes.js"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT} ✅`));
