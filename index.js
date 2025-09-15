const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const adminRoutes = require("./router/Admin.router.js");
const serviceRoutes = require("./router/services.router.js")
const proposalRouter = require("./router/Proposal.router.js")
const path = require("path");

dotenv.config();

const app = express();


app.use(express.json());
app.use(cors({
  // origin: ["http://localhost:5173", "http://localhost:3000"],
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));


// Health Check
app.get("/", (req, res) => {
  res.send("✅ Admin server is running");
});

// Routes
app.use("/api/admin", adminRoutes);

app.use("/api/service", serviceRoutes);

app.use("/api/proposal", proposalRouter);

app.use("/assets", express.static(path.join(__dirname, "template/assets")));

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Connection Error:", err.message));
