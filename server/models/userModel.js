const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

}, { strict: false });

const User = mongoose.model("user", userSchema);
module.exports = User;
