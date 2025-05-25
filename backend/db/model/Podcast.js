const mongoose = require('mongoose');

const podcastSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin', // Reference to the Admin who created the podcast
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
    rssFeed: {
        type: String,
        required: true, // The podcast's RSS feed URL
    },
    coverImg: {
        type: String,
        required: true, // Cover image URL for the podcast
    },
    episodeCount: {
        type: Number,
        default: 0,
        required: true,
    }, // Each time a new episode is created, you increment the episodeNumber by 1
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Podcast', podcastSchema);
