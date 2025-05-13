const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
        required: true,
    },
    podcastId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Podcast',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    audio: {
        type: String,
        required: true, // audio file for the episode
    },
    publishedAt: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Episode', episodeSchema);