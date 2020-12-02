const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const { notFound, errorHandler } = require('./middlewares')
const router = require('./apis/logs')

const app = express()

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(express.json())
// set up the middleware for morgan to log the API calls
app.use(morgan('common'))
// set up the middleware for helmet to secure our headers
app.use(helmet())
// set up the middleware for cors to enable client server communication
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    }),
)
app.get('/', (req, res) => {
    res.json({
        message: 'Hello from the other side',
    })
})
app.use('/api/logs', router)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 1337

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at http://localhost:${port}`)
})
