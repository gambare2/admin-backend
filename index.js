const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

const adminRoutes = require("./router/Admin.router.js");
const serviceRoutes = require("./router/services.router.js");
const proposalRouter = require("./router/Proposal.router.js");
// const graphRouter = require("./router/Graph.router.js");

dotenv.config();

const app = express();

// ✅ Ensure uploads folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("✅ Created uploads folder");
}

// ✅ Middleware
app.use(cors({
  // origin: ["http://localhost:5173", "http://localhost:3000"], 
  origin:  process.env.FRONTEND_URL,
  credentials: true,
}));

// Support JSON + large payloads (base64 images)
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));

// Support URL-encoded forms
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/proposal", proposalRouter);
// app.use("/api/graph", graphRouter);

// ✅ Serve static assets
app.use("/assets", express.static(path.join(__dirname, "template/assets")));
app.use("/uploads", express.static(uploadsDir));

// ✅ Health check
app.get("/", (req, res) => res.send("✅ Admin server is running"));

// ✅ Start server + connect MongoDB
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ DB Connection Error:", err.message));

