const config = require('./config/config')
const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

app.get('/', async (req, res) => {
    res.send("Hello World!")
})

app.get('/getUser', require('./application/userApplication').getUser)
app.post('/cacheUser', require('./application/userApplication').generateCache)

app.listen(config.PORT, () => {
    console.log("Server listening on", config.PORT)
})