const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
// register user :
router.post('/register', async (req, res) => {
    if (!req.body?.username ||
        !req.body?.email ||
        !req.body?.password) {
        res.status(400).json({ message: 'invalid request' })
    }
    const { username, email, password } = req.body;
    console.log({ username, email, password, id: 200 });

    res.status(200).json({ message: `user has been created` })
})
// get user
router.get('/user/:user_id', async (req, res) => {
    const user_id = req.params;
    // mongo
    const user = `USER ${user_id.user_id}`
    res.send(user)
})
// update socket state
router.put('/socket', async (req, res) => {
    res.send('online')
})







module.exports = router;