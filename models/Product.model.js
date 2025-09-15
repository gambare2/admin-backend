const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    specification: { type: Number, required: true},
    quantitiy: { type: Number, required: true},
  },
  { timestamps: true }
);

console.log("✅ Product model loaded");

module.exports = mongoose.model("Product", productSchema);
