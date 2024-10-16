

const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
	username: { type: String, required: true },
	word_typed: { type: [Number,timestamp] , required: true },
    timestamp: { type: Date, default: Date.now },
});

const   Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
