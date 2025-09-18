const multer = require("multer");
const GraphImage = require("../models/Graph.model.js");
const express = require("express")
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/uploadGraph", upload.single("file"), async (req, res) => {
    try {
      let buffer;
      let contentType = "image/png";
      let filename = `graph-${Date.now()}.png`;
  
      if (req.file) {
        // got a file from multipart/form-data
        buffer = req.file.buffer;
        contentType = req.file.mimetype;
        filename = req.file.originalname;
      } else if (req.body.image) {
        // got base64 string
        const base64Data = req.body.image.replace(/^data:image\/\w+;base64,/, "");
        buffer = Buffer.from(base64Data, "base64");
      } else {
        return res.status(400).json({ error: "No image provided" });
      }
  
      const graphImage = new GraphImage({
        filename,
        contentType,
        data: buffer
      });
  
      await graphImage.save();
  
      res.json({
        message: "Graph image saved successfully",
        id: graphImage._id
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  });

module.exports = router;