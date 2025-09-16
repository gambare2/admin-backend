const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Product = require("../models/Product.model.js");
const Service = require("../models/Service.model.js");
const Employee = require("../models/employee.model.js");
const Proposal = require("../models/Proposal.model.js");

const router = express.Router();

//
// ------------------ PRODUCT ROUTES ------------------
//

// ➕ Add Product
router.post("/add-product", async (req, res) => {
  try {
    const { name, price, description,specification, quantitiy } = req.body;
    if (!name || !price || !description || !specification || !quantitiy) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const product = new Product({ name, price, description,specification,quantitiy });
    await product.save();

    res.json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get Products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete Product
router.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ Update Product
router.put("/products/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product updated successfully", product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//
// ------------------ SERVICE ROUTES ------------------
//

// ➕ Add Service
router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const service = new Service({ name, price, description });
    await service.save();

    res.json({ message: "Service added successfully", service });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📋 Get All Services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ Delete Service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (price) updatedFields.price = price;
    if (description) updatedFields.description = description;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields }, 
      { new: true }
    );

    if (!updatedService) {
      return res.status(404).json({ error: "Service not found" });
    }

    res.json({ message: "Service edited successfully", service: updatedService });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//
// ------------------ EMPLOYEE ROUTES ------------------
//

// ➕ Add Employee
router.post("/add-employee", async (req, res) => {
  try {
    const { name, email, password, phoneno } = req.body;
    if (!name || !email || !password || !phoneno) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = new Employee({ name, email, password: hashedPassword, phoneno });
    await employee.save();

    res.json({ message: "Employee added successfully", employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all employee 

router.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find({}, "-password");
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees", details: err.message });
  }
});

// delete employee 
router.delete("/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee Removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// edit employee 

router.put("/employees/:id", async (req, res) => {
  try {
    const { name, email, password, phoneno } = req.body;
    const updatedFields = {};

    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;
    if (password) updatedFields.password = password;
    if (phoneno) updatedFields.phoneno = phoneno;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields }, 
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee edited successfully", employee: updatedEmployee });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 👨‍💻 Employee Login
router.post("/employee-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(400).json({ error: "Invalid email" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: employee._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
