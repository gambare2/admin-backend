const express = require("express");
const router = express.Router();
const Proposal = require("../models/Proposal.model.js");
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const generateSolarQuoteHTML = require("../template/solarQuoteTemplate.js");

// 📌 Add Proposal
router.post("/add-proposal", async (req, res) => {
  try {
    const {
      clientName,
      clientPhone,
      clientEmail,
      clientAddress,
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
      proposalStructure,
      structureDes,
      systemwarranty,
      stage1,
      stage2,
      stage3,
      stage4,
      yearlyconsumption,
      yearlysolargeneration,
      decrementgeneration,
      plotgraph,
      directionType,
      priceincrement,
      graphType,
      services,
      products,
      employees,
      balanceOfSystem,
      ourScope,
      customerScope,
    } = req.body;

    // Validation (only required fields)
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
      proposalStructure,
      structureDes,
      systemwarranty,
      stage1,
      stage2,
      stage3,
      stage4,
      yearlyconsumption,
      yearlysolargeneration,
      decrementgeneration,
      plotgraph,
      directionType,
      priceincrement,
      graphType,
      services: Array.isArray(services) ? services : [],
      products: Array.isArray(products) ? products : [],
      employees: Array.isArray(employees) ? employees : [],
      balanceOfSystem,
      ourScope,
      customerScope,
    });

    await proposal.save();
    await proposal.populate("services products employees");

    res.json({ message: "✅ Proposal added successfully", proposal });
  } catch (err) {
    console.error("❌ Error saving proposal:", err);
    res.status(500).json({ error: err.message });
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
router.get("/:id/pdf", async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate("services")
      .populate("products")
      .populate("employees");

    if (!proposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    const html = generateSolarQuoteHTML(proposal);

    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "15mm", bottom: "15mm" },
    });

    await browser.close();

    const fileName = proposal.clientName?.replace(/\s+/g, "_") || "proposal";

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename=${fileName}.pdf`,
    });

    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF Error:", err);
    res.status(500).json({ error: "Failed to generate PDF" });
  }
});

module.exports = router;
