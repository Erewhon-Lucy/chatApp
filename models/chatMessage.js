const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: String
});

const User = mongoose.model('ChatMessage', chatMessageSchema);