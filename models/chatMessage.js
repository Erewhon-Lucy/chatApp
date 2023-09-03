const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
    username: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ChatMessage = mongoose.model('ChatMessage', chatMessageSchema);

module.exports = ChatMessage;