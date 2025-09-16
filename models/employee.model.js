const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, 
  phoneno: { type: Number, required: true },
  employeeId: { type: String, unique: true }, 
}, { timestamps: true });

// ✅ Hash password before saving
employeeSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// ✅ Generate professional employeeId
employeeSchema.pre("save", function (next) {
  if (!this.employeeId) {
    const namePart = this.name.slice(0, 2).toUpperCase(); 
    const phonePart = this.phoneno.toString().slice(-4);  
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, ""); 

    this.employeeId = `EMP-${namePart}${phonePart}-${datePart}`;
  }
  next();
});

// ✅ Prevent OverwriteModelError
const Employee = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

module.exports = Employee;

