const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')

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
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message,
        stack:
            process.env.NODE_ENV === 'production'
                ? "OPPS, we're sorry but Some error happened 🙊 🙈 🙉"
                : error.stack,
    })
})

const port = process.env.PORT || 1337

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})
