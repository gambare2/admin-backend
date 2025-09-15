const express = require("express");
const Product= require("../models/Product.model.js");
const Employee= require("../models/employee.model.js");
const Service= require("../models/Service.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")


const router = express.Router();


// admin login 

router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Admin login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router