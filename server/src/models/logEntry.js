const mongoose = require('mongoose')

const { Schema } = mongoose

// TODO: Refactor to GeoJson
const requiredNumber = {
    type: Number,
    required: true,
}
const logEntrySchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    comments: String,
    description: String,
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90,
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180,
    },
    rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    visitDate: {
        type: Date,
        required: true,
    },
    image: String,
    timestamps: true,
})
const logEntry = mongoose.model('logEntry', logEntrySchema)

module.exports = logEntry
