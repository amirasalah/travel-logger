const { Router } = require('express')
const mongoose = require('mongoose')
const LogEntry = require('../models/logEntry')

const { ObjectId } = mongoose.Types.ObjectId

const { PASSWORD } = process.env

const router = Router()

// TODO: Add delete endpoint
// TODO: Add update endpoint
router.get('/', async (req, res, next) => {
    try {
        const entries = await LogEntry.find()
        res.json(entries)
    } catch (error) {
        next(error)
    }
})
router.post('/', async (req, res, next) => {
    try {
        if (req.get('X-API-KEY') !== PASSWORD) {
            res.status(401)
            throw new Error('UnAuthorized')
        }
        const logEntry = new LogEntry(req.body)
        const newEntry = await logEntry.save()
        res.json(newEntry)
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422)
        }
        next(error)
    }
})
router.delete('/:id', (req, res) => {
    LogEntry.findByIdAndRemove(ObjectId(req.params.id), (err, docs) => {
        if (err) res.json(err)
        else {
            res.json({ success: true })
        }
    })
})
module.exports = router
