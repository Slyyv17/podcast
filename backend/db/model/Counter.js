// for incrementing each episodes of a podcast
const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    podcastId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast',
        required: true,
    },
    lastEpisodeNumber: {
        type: Number,
        default: 0, // Default value for the episode count
    }, // used to track the most recent episode number in a podcast series
}, { timestamps: true });

module.exports = mongoose.model('Counter', counterSchema);