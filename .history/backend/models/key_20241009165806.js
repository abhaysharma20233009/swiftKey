// models/ChatMessage.js

const mongoose = require('mongoose');

const keySchema = new mongoose.Schema({
	user: { type: String, required: true },
	word: { type: Number, required: true },
	timestamp: { type: Date, default: Date.now },
});

const Key = mongoose.model('Key', key);

module.exports = Key;
