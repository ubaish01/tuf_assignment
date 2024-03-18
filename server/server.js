const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 8080;

const mainRouter = require('./routes/main')

app.use(express.json())

app.use('/api/v1', mainRouter);

app.listen(PORT, () => {
    console.log('server is listening on port ', PORT);
})