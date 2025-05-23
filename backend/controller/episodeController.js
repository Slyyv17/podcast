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

const getEpisodes = async (req, res) => {
  const { podcastId } = req.params;

  try {
    const db = getDB();
    const episodeCollection = db.collection('episodes');

    const episodes = await episodeCollection
      .find({ podcastId: new ObjectId(podcastId) }) // only episodes tied to that podcast
      .toArray();

    return res.status(200).json({ episodes });
  } catch (err) {
    console.error('Error retrieving episodes:', err);
    return res.status(500).json({ message: 'Error retrieving episodes' });
  }
};

const getEpisodeById = async (req, res) => {
  const { podcastId, id } = req.params;

  if (!ObjectId.isValid(podcastId) || !ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid podcast or episode ID' });
  }

  try {
    const db = getDB();
    const episode = await db.collection('episodes').findOne({
      _id: new ObjectId(id),
      podcastId: new ObjectId(podcastId), // Ensure it's tied to the correct podcast
    });

    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    return res.status(200).json({ message: 'Episode retrieved successfully', episode });

  } catch (error) {
    console.error('Error fetching episode:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteEpisode = async (req, res) => {
  const { podcastId, id } = req.params;

  try {
    const db = getDB();
    const episodeCollection = db.collection('episodes');

    const episode = await episodeCollection.findOne({
      _id: new ObjectId(id),
      podcastId: new ObjectId(podcastId),
    });

    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    // Delete audio from Cloudinary
    const publicId = episode.audio.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`podcast-audios/${publicId}`, {
      resource_type: 'video',
    });

    // Delete from DB
    const result = await episodeCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    return res.status(200).json({ message: 'Episode deleted successfully' });
  } catch (err) {
    console.error('Error deleting episode:', err);
    return res.status(500).json({ message: 'Error deleting episode' });
  }
};

module.exports = {
  newEpisode,
  getEpisodes,
  getEpisodeById,
  deleteEpisode,
};
