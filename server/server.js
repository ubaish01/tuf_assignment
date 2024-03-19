const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;

const mainRouter = require('./routes/main')

app.use(express.json())
app.use(
    cors({
        origin: ['http://localhost:5173'],
        method: 'GET,POST,DELETE,PUT',
        credentials: true,
    })
);

app.use('/api/v1', mainRouter);

app.get('/', (req, res) => {
    return res.status(200).json({ success: true, message: 'default route working fine!' });
})

app.listen(PORT, () => {
    console.log('server is listening on port ', PORT);
})

module.exports = app;