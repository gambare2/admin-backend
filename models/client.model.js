const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema({
  nameclient: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  address: { type: String, required: true }, 
  phoneno: { type: Number, required: true },
  clientId: { type: String, unique: true }, 
}, { timestamps: true });


// ✅ Generate professional clientId
clientSchema.pre("save", function (next) {
  if (!this.clientId) {
    const namePart = this.nameclient.slice(0, 2).toUpperCase(); 
    const phonePart = this.phoneno.toString().slice(-4);  
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, ""); 

    this.clientId = `Cl-${namePart}${phonePart}-${datePart}`;
  }
  next();
});

// ✅ Prevent OverwriteModelError
const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

module.exports = Client;

