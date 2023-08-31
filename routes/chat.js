var express = require('express');
var router = express.Router();
const ChatMessage = require('../models/chatMessage');
const { isObjectIdOrHexString } = require('mongoose');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)

router.get('/', async (req, res) => {
	try {
        const messages = await ChatMessage.find({}).exec();
        res.render('chat', { messages });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error fetching chat messages');
    }
})

router.get('/history', async (req, res) => {
	try {
		const messages = await ChatMessage.find().sort({ timestamp: 1 });
		res.json(messages);
	} catch (error) {
		res.status(500).json({ error: 'Error fetching chat history' });
	}
});

router.post('/send', async (req, res) => {
	// const { username, message } = req.body;
	// try {
	// 	const newMessage = new ChatMessage({
	// 		username,
	// 		message,
	// 		timestamp: new Date()
	// 	});
	// 	await newMessage.save();
	// 	res.json({ success: true });
	// } catch (error) {
	// 	res.status(500).json({ error: 'Error sending message' });
	// }
	var message = req.body.message;
	message.save(function (err, message) {
		if (err) {
			console.log(err);
			sendStatus(500);
		}
		io.emit('message', message);
		res.sendStatus(200);
	})
});

io.on('connection', (socket) => {
	console.log(' user connected')
})

module.exports = router;