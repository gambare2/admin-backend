// models/Proposal.js
const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },   
    clientEmail: { type: String, required: true },   
    clientAddress: { type: String, required: true }, 

    projectDetails: { type: String, required: true },
    budget: { type: String, required: true },

    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", proposalSchema);
