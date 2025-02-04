const express = require('express')
const app = express();
const PORT = 3260
const userRoutes = require('./Routes/userRoutes')
const chatRoutes = require('./Routes/chatRoutes')
const messageRoutes = require('./Routes/messageRoutes')
app.use(express.json())
app.use('', messageRoutes)
app.use('', chatRoutes)
app.use('', userRoutes)
app.listen(PORT, () => {
    console.log(`Online on Port ${PORT} `);
})