const express = require('express');
const router = express.Router();
const Message = require('../models/message')

router.post('/message', async (req, res) => {
    if (!req.body?.content || !req.body?.author) {
        res.status(400).json({ message: 'invalid request' })
    }
    try {
        const { content, author } = req.body;
        const message = new Message(content, author);
        const savedMessage = await message.save()
        res.send(savedMessage)
    } catch (err) {
        console.error(err);
    }

})
router.get('/message/:message_id', async (req, res) => {
    const { message_id } = req.params;
    const message = { author: "bob", content: "I sleep in a ant House", message_id }
    res.send(message)
})
module.exports = router;