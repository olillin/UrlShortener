const express = require('express')

require('dotenv/config')

const app = express()
module.exports = app

app.get('/', (req, res) => {
    res.send('Hello world!')
})