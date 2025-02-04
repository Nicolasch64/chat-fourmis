const express = require('express');
const router = express.Router()

router.get('/chat/:chat_id', async (req, res) => {
    const { chat_id } = req.params;
    console.log(chat_id);
    res.send(chat_id)
})




module.exports = router;