const { getDB } = require('../config/config');
const { ObjectId } = require('mongodb');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const newEpisode = async (req, res) => {
  const { title, description } = req.body;
  const audioFile = req.file;

  try {
    const adminId = req.admin.id;
    const podcastId = req.params.podcastId;

    if (!adminId || !ObjectId.isValid(adminId)) {
      return res.status(401).json({ message: 'Unauthorized or invalid admin ID' });
    }

    if (!podcastId || !ObjectId.isValid(podcastId)) {
      return res.status(400).json({ message: 'Invalid podcast ID' });
    }

    if (!title || !description || !audioFile) {
      return res.status(400).json({ message: 'Title, description, and audio file are required' });
    }

    const db = getDB();
    const podcastCollection = db.collection('podcasts');
    const episodeCollection = db.collection('episodes');

    // Get podcast coverImg
    const podcast = await podcastCollection.findOne({ _id: new ObjectId(podcastId) });
    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    // Upload audio to Cloudinary
    const audioResult = await cloudinary.uploader.upload(audioFile.path, {
      resource_type: 'video', // 'video' is used for audio/video in Cloudinary
      folder: 'podcast-audios',
    });

    // Delete local file
    fs.unlink(audioFile.path, (err) => {
      if (err) console.error('Error deleting local file:', err);
    });

    const newEp = {
      podcastId: new ObjectId(podcastId),
      title,
      description,
      audio: audioResult.secure_url,
      coverImg: podcast.coverImg,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await episodeCollection.insertOne(newEp);

    return res.status(201).json({
      message: 'Episode created successfully',
      episode: {
        id: result.insertedId,
        ...newEp,
      },
    });
  } catch (error) {
    console.error('Error creating episode:', error);
    return res.status(500).json({ message: 'Error creating episode' });
  }
};

module.exports = {
  newEpisode,
};
