const express = require('express')
const User = require('../models/user')
const router = express.Router()
// register user :
router.post('/register', async (req, res) => {
    if (!req.body?.username ||
        !req.body?.email) {
        res.status(400).json({ message: 'invalid request' })
    }
    try {
        const { username, email } = req.body;
        const user = new User({ username, email });
        const savedUser = await user.save();
        res.status(201).json({ message: `user has been created`, savedUser })
    } catch (err) {
        console.error(err);
    }

})
// get user
router.get('/user/:user_id', async (req, res) => {
    try {
        const { user_id } = req.params;
        console.log(user_id);

        const user = await User.findById(user_id)
        res.send(user)
    } catch (err) {
        console.error(err);
    }

})
// update socket state
router.put('/socket', async (req, res) => {
    try {
        const { socket, user_id } = req.body;
        const updatedUser = await User.findByIdAndUpdate(user_id, { $set: { socketId: socket } }, { new: true });
        res.send(updatedUser)
    } catch (err) {
        console.error(err);
    }

})







module.exports = router;