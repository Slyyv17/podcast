const { getDB } = require('../config/config');
const { ObjectId } = require('mongodb');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

const newPodcast = async (req, res) => {
  const { title, description } = req.body;
  const file = req.file;

  try {
    const adminId = req.admin.id;

    if (!adminId || !ObjectId.isValid(adminId)) {
      return res.status(401).json({ message: 'Unauthorized or invalid admin ID' });
    }

    if (!title || !description || !file) {
      return res.status(400).json({ message: 'Title, description, and cover image are required' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'podcasts',
    });

    // Remove local file
    fs.unlink(file.path, (err) => {
      if (err) console.error('Failed to delete local file:', err);
    });

    const db = getDB();
    const podcastCollection = db.collection('podcasts');

    const newPodcast = {
      adminId: new ObjectId(adminId),
      title,
      description,
      coverImg: result.secure_url,
      rssFeed: null,
      likes: 0,
      userLiked: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const dbRes = await podcastCollection.insertOne(newPodcast);

    // Generate and set rssFeed URL
    const rssUrl = `${process.env.BASE_URL}/podcast/${dbRes.insertedId}/rss.xml`;
    await podcastCollection.updateOne(
      { _id: dbRes.insertedId },
      { $set: { rssFeed: rssUrl } }
    );

    newPodcast.rssFeed = rssUrl;

    return res.status(201).json({
      message: 'Podcast uploaded successfully',
      podcast: {
        id: dbRes.insertedId,
        ...newPodcast,
      },
    });

  } catch (err) {
    console.error('Upload error:', err);
    return res.status(500).json({ message: 'Something went wrong while uploading the podcast' });
  }
};

module.exports = {
  newPodcast,
};