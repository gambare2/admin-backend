// models/GraphImage.js
const mongoose = require("mongoose");

const GraphImageSchema = new mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,   // binary image data
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("GraphImage", GraphImageSchema);
