// models/ChatMessage.js

const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
	userName: { type: String, required: true },
	email: { type: String , required: true },
	password: { type: String , required: true },
	timestamp: { type: Date, default: Date.now },
});

const Key = mongoose.model('Key', keySchema);

module.exports = Key;
