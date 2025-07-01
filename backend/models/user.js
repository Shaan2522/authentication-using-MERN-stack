// ...existing code...
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // hashed password
  oauthProvider: { type: String }, // 'google', 'github', or undefined
  oauthId: { type: String },
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = mongoose.model('User', userSchema);
// ...existing code...
