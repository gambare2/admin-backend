const express = require("express");
const router = express.Router();
const Proposal = require("../models/Proposal.model.js");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// -------------------
// Multer Memory Storage for Graph Uploads
// -------------------
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// 📌 Add Proposal
router.post("/add-proposal", async (req, res) => {
  try {
    const {
      clientName,
      clientPhone,
      clientEmail,
      clientAddress,
      clienttitle,
      customerType,
      projectsize,
      consumption,
      electricity,
      generation,
      Wattpeak,
      proposalWattpeak,
      warranty,
      performancewarranty,
      Invertorwarranty,
      InvertorSize,
      quantity,
      invertorquantitiy,
      invertortype,
      invertorPhase,
      cableBrands,
      batteryBrand,
      proposalStructure,
      structureDes,
      systemwarranty,
      stage1,
      stage2,
      stage3,
      stage4,
      graphType,
      services,
      products,
      employees,
      balanceOfSystem,
      ourScope,
      customerScope,
      tableImage,
      graphImage,
      rows,       
      gst,        
      subtotal,   
      gstAmount,  
      total,     
    } = req.body;

    // Validation
    if (!clientName || !clientPhone || !clientEmail || !clientAddress) {
      return res.status(400).json({
        error: "clientName, clientPhone, clientEmail, and clientAddress are required.",
      });
    }

    const proposal = new Proposal({
      clientName,
      clientPhone,
      clientEmail,
      clientAddress,
      clienttitle,
      customerType,
      projectsize,
      consumption,
      electricity,
      generation,
      Wattpeak,
      proposalWattpeak,
      warranty,
      performancewarranty,
      Invertorwarranty,
      InvertorSize,
      quantity,
      invertorquantitiy,
      invertortype,
      invertorPhase,
      cableBrands,
      batteryBrand,
      proposalStructure,
      structureDes,
      systemwarranty,
      stage1,
      stage2,
      stage3,
      stage4,
      graphType,
      services: Array.isArray(services) ? services : [],
      products: Array.isArray(products) ? products : [],
      employees: Array.isArray(employees) ? employees : [],
      balanceOfSystem,
      ourScope,
      customerScope,
      tableImage,
      graphImage,
      rows: Array.isArray(rows) ? rows : [], // default to empty array
      gst: gst || 0,
      subtotal: subtotal || 0,
      gstAmount: gstAmount || 0,
      total: total || 0,
    });

    await proposal.save();
    await proposal.populate("services products employees");

    res.json({ message: "✅ Proposal added successfully", proposal });
  } catch (err) {
    console.error("❌ Error saving proposal:", err);
    res.status(500).json({ error: err.message });
  }
});



// 📌 Upload Graph Image
router.post("/proposal/:id/uploadGraph", upload.single("file"), async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) return res.status(404).json({ error: "Proposal not found" });

    let buffer, contentType, filename;

    if (req.file && req.file.buffer) {
      buffer = req.file.buffer;
      contentType = req.file.mimetype;
      filename = req.file.originalname;
    } else if (req.body.image) {
      const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
      buffer = Buffer.from(base64Data, "base64");
      contentType = "image/png";
      filename = `graph-${Date.now()}.png`;
    } else {
      return res.status(400).json({ error: "No image provided" });
    }

    const base64 = buffer.toString("base64");
    const dataUrl = `data:${contentType};base64,${base64}`;

    proposal.graphImage = dataUrl;
    await proposal.save();

    res.json({
      message: "Graph image saved successfully",
      graphImage: dataUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// -------------------
// Upload Table Image
// -------------------
router.post("/:id/uploadTable", async (req, res) => {
  try {
    const { id } = req.params;
    const { image } = req.body; // expects base64 string

    if (!image) return res.status(400).json({ error: "No image provided" });

    // Match image type
    const matches = image.match(/^data:image\/(png|jpeg|jpg);base64,(.+)$/);
    if (!matches) return res.status(400).json({ error: "Not a valid image" });

    const ext = matches[1];
    const data = matches[2];

    // Convert to buffer
    const buffer = Buffer.from(data, "base64");

    // Ensure uploads folder exists
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `table-${id}.${ext}`;
    const filePath = path.join(uploadDir, fileName);

    // Save image
    fs.writeFileSync(filePath, buffer);

    console.log("✅ Image saved:", filePath);

    res.json({ file: fileName });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error saving image" });
  }
});

// 📌 Update Proposal
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProposal = await Proposal.findByIdAndUpdate(id, updateData, {
      new: true,
    }).populate("services products employees");

    if (!updatedProposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    res.json({ message: "✅ Proposal updated successfully", proposal: updatedProposal });
  } catch (err) {
    console.error("❌ Error updating proposal:", err);
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get All Proposals
router.get("/proposals", async (req, res) => {
  try {
    const proposals = await Proposal.find()
      .populate("services")
      .populate("products")
      .populate("employees");

    res.json(proposals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get Single Proposal
router.get("/:id", async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate("services")
      .populate("products")
      .populate("employees");

    if (!proposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    res.json(proposal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete Proposal
router.delete("/:id", async (req, res) => {
  try {
    await Proposal.findByIdAndDelete(req.params.id);
    res.json({ message: "Proposal deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Generate Proposal PDF
router.get("/:id/pdfkit", async (req, res) => {
  const proposalId = req.params.id;
  await generatePdfProposal(proposalId, res);
});





module.exports = router;
