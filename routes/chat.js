var express = require('express');
var router = express.Router();
const ChatMessage = require('../models/chatMessage');
const { isObjectIdOrHexString } = require('mongoose');

io.on("connection", (socket) => {
  	console.log("server socket connected");
	socket.on("add-message", async (message) => {
		try {
            const { username, message: msg, timestamp } = message;
            const chatMessage = new ChatMessage({ username, message: msg, timestamp });
            await chatMessage.save();
            io.emit('add-message', {
                username: username,
                message: msg,
                timestamp: chatMessage.timestamp
            });
        } catch (err) {
            console.error(err);
        }
	})

});

router.get('/', async (req, res) => {
	res.render('chat');
})

router.get('/messages', async (req, res) => {
	try {
		const messages = await ChatMessage.find({});
		res.send(messages);
	} catch (error) {
		res.status(500).send(error);
	}
})

router.post('/send', async (req, res) => {
	try {
		const { username, message } = req.body;
		const chatMessage = new ChatMessage({ username, message });
		await chatMessage.save();

		res.json({ success: true });


	} catch (err) {
		console.error(err);
        res.status(500).json({ success: false, error: 'Message not sent' });
	}
});

module.exports = router;