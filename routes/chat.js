var express = require('express');
var router = express.Router();
const ChatMessage = require('../models/chatMessage');
const { isObjectIdOrHexString } = require('mongoose');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)


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
		res.send('Message sent');

		io.emit('message', {
			username: username,
			message: message,
			timestamp: chatMessage.timestamp
		});

		res.json({ success: true });

	} catch (err) {

	}
});

// io.on('connection', (socket) => {
// 	console.log(' user connected')
// })

module.exports = router;