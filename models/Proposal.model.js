const mongoose = require("mongoose");

// Define the row schema for the table
const rowSchema = new mongoose.Schema({
  description: { type: String, default: "" },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  note: { type: String, default: "" },
});

const proposalSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientAddress: { type: String, required: true },
    clienttitle: { type: String, required: true },

    customerType: { type: String },
    projectsize: { type: String },
    consumption: { type: String },
    electricity: { type: String },
    generation: { type: String },
    Wattpeak: { type: String },
    proposalWattpeak: { type: String },
    warranty: { type: String },
    performancewarranty: { type: String },
    Invertorwarranty: { type: String },
    InvertorSize: { type: String },
    quantity: { type: String },
    invertorquantitiy: { type: String },
    invertortype: { type: String },
    invertorPhase: { type: String },
    cableBrands: { type: [String], default: [] },
    proposalStructure: { type: String },
    structureDes: { type: String },
    systemwarranty: { type: String },
    batteryBrand: { type: String },

    stage1: { type: String },
    stage2: { type: String },
    stage3: { type: String },
    stage4: { type: String },

    graphType: { type: String },

    balanceOfSystem: { type: String },
    ourScope: { type: String },
    customerScope: { type: String },

    // Table rows
    rows: { type: [rowSchema], default: [] },

    // Totals
    gst: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    total: { type: Number, default: 0 },

    // images (base64 strings)
    tableImage: { type: String },
    graphImage: { type: String },

    // relations
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", proposalSchema);
