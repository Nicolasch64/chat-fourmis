const express = require('express');
const router = express.Router();
const Message = require('../models/message')
const Chat = require('../models/chat')
router.post('/message', async (req, res) => {
    if (!req.body?.content || !req.body?.author) {
        res.status(400).json({ message: 'invalid request' })
    }
    try {
        const { content, author, chat_id } = req.body;
        console.log(content, author);
        const message = new Message({ content, author });
        const savedMessage = await message.save()
        const updatedChat = await Chat.findByIdAndUpdate(chat_id, { $push: { message: savedMessage._id } }, { new: true })
        res.send({ savedMessage, updatedChat })
    } catch (err) {
        console.error(err);
    }

})
router.get('/message/:message_id', async (req, res) => {
    try {
        const { message_id } = req.params;
        const message = await Message.findById(message_id)
        res.send(message)
    } catch (err) {
        console.error(err);
    }

})
module.exports = router;