const { Router } = require('express')
const LogEntry = require('../models/logEntry')

const router = Router()

router.get('/', (req, res) => {
    res.json({
        message: '✈️',
    })
})
router.post('/', async (req, res) => {
    try {
        const logEntry = new LogEntry(req.body)
        const newEntry = await logEntry.save()
        res.json(newEntry)
    } catch (error) {}
})
module.exports = router
