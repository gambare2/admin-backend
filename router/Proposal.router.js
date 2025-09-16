const express = require("express");
const router = express.Router();
const Proposal = require("../models/Proposal.model.js");
const chromium = require("@sparticuz/chromium");
const puppeteer = require("puppeteer-core");
const path = require("path");
const fs = require("fs");
const generateSolarQuoteHTML = require("../template/solarQuoteTemplate.js");

 
router.post("/add-proposal", async (req, res) => {
  try {
    const {
      clientName,
      clientPhone,
      clientEmail,
      clientAddress,
      projectDetails,
      budget,
      services,
      products,
      employees,
    } = req.body;

    console.log("📌 Incoming request:", req.body);

    // Basic validation
    if (!clientName || !clientPhone || !clientEmail || !clientAddress || !projectDetails || !budget) {
      return res.status(400).json({
        error: "All client and project fields are required: name, phone, email, address, project details, budget",
      });
    }


    const validServices = Array.isArray(services) ? services : [];
    const validProducts = Array.isArray(products) ? products : [];
    const validEmployees = Array.isArray(employees) ? employees : [];

    const proposal = new Proposal({
      clientName,
      clientPhone,
      clientEmail,
      clientAddress,
      projectDetails,
      budget,
      services: validServices,
      products: validProducts,
      employees: validEmployees,
    });

    await proposal.save();

    // Populate references for better response
    await proposal.populate("services products employees");

    res.json({ message: "Proposal added successfully", proposal });
  } catch (err) {
    console.error("❌ Error saving proposal:", err);
    res.status(500).json({ error: err.message });
  }
});

  
  
  // 📋 Get Proposals
  router.get("/proposals", async (req, res) => {
    try {
      const proposals = await Proposal.find();
      res.json(proposals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // ❌ Delete Proposal
  router.delete("/proposals/:id", async (req, res) => {
    try {
      await Proposal.findByIdAndDelete(req.params.id);
      res.json({ message: "Proposal deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
// 📄 Generate Proposal PDF
router.get("/proposals/:id/pdf", async (req, res) => {
  try {
    const proposal = await Proposal.findById(req.params.id)
      .populate("services")
      .populate("products")
      .populate("employees");

    if (!proposal) {
      return res.status(404).json({ error: "Proposal not found" });
    }

    const html = generateSolarQuoteHTML(proposal);

    // ✅ Launch Puppeteer with Chromium for Render
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(), // gets the right Chromium path
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

    const fileName =
      proposal.clientName?.replace(/\s+/g, "_") || "proposal";

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
