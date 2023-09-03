var express = require('express');
var router = express.Router();
const ChatMessage = require('../models/chatMessage');
const { isObjectIdOrHexString } = require('mongoose');
const io = require('socket.io')();

io.on("connection", (socket) => {
  	console.log("socket connected");
	socket.on("add-message", async (message) => {
		try {
            // 获取最新添加到数据库的一条消息
            const latestMessage = await ChatMessage.findOne().sort({ timestamp: -1 }).lean();
            if (latestMessage) {
                // 广播给所有客户端
                io.emit('add-message', latestMessage);
            }
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

		io.emit('add-message');

		res.json({ success: true });


	} catch (err) {
		console.error(err);
        res.status(500).json({ success: false, error: 'Message not sent' });
	}
});

module.exports = router;