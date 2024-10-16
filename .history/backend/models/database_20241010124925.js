

const mongoose = require('mongoose');

const databaseSchema = new mongoose.Schema({
	username: { type: String, required: true },
	word_typed: { type: [Number] , required: true },
});

const   Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
