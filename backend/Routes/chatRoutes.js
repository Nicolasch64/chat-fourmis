const express = require('express');
const router = express.Router()
const Chat = require('../models/chat');


router.get('/chat/:chat_id', async (req, res) => {
    const { chat_id } = req.params;
    const chat = await findById(chat_id)
    console.log(chat_id);
    res.send(chat)
})
router.post('/chat', async (req, res) => {
    try {
        const chat = new Chat()
        await chat.save()
        res.send(`chat ${chat} created`)

    } catch (error) {
        console.error(error);

    }

})



module.exports = router;