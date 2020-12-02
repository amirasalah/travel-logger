const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const { notFound, errorHandler } = require('./middlewares')

const app = express()

// set up the middleware for morgan to log the API calls
app.use(morgan('common'))
// set up the middleware for helmet to secure our headers
app.use(helmet())
// set up the middleware for cors to enable client server communication
app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
)
app.get('/', (req, res) => {
    res.json({
        message: 'Hello from the other side',
    })
})
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 1337

app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening at http://localhost:${port}`)
})
