const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
    word: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const databaseSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:{type:String,required:true},
    words_typed: { type: [wordSchema], required: true }, // Use the new wordSchema
});

const Database = mongoose.model('Database', databaseSchema);

module.exports = Database;
