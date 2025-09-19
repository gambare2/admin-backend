const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String, required: true },
    clientAddress: { type: String, required: true },

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
    ableBrands: {
      type: [String], 
      default: [] },
    proposalStructure: { type: String },
    structureDes: { type: String },
    systemwarranty: { type: String },

    stage1: { type: String },
    stage2: { type: String },
    stage3: { type: String },
    stage4: { type: String },

    yearlyconsumption: { type: String },
    yearlysolargeneration: { type: String },
    decrementgeneration: { type: String },
    plotgraph: { type: String },
    directionType: { type: String },
    priceincrement: { type: String },
    graphType: { type: String },

    balanceOfSystem: { type: String },
    ourScope: { type: String },
    customerScope: { type: String },

    // images
    tableImage: { type: String },         
    graphimage: { type: String },         

    // relations
    services: [{ type: mongoose.Schema.Types.ObjectId, ref: "Service" }],
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proposal", proposalSchema);
