const express = require('express');
const router = express.Router();


router.post('/message', async (req, res) => {
    if (!req.body?.content || !req.body?.author) {
        res.status(400).json({ message: 'invalid request' })
    }
    const { content, author } = req.body;
    const user = { content, author }
    res.send(user)
})
router.get('/message/:message_id', async (req, res) => {
    const { message_id } = req.params;
    const message = { author: "bob", content: "I sleep in a ant House", message_id }
    res.send(message)
})
module.exports = router;