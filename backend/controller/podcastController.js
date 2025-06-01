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

const getPodcasts = async (req, res) => {
  try {
    const db = getDB();
    const podcastCollection = db.collection('podcasts');

    const podcasts = await podcastCollection.find({}).toArray();
    if (!podcasts || podcasts.length === 0) {
      return res.status(404).json({ message: 'No podcasts found' });
    }

    return res.status(200).json({
      adminId: req.admin.id,
      message: 'Podcasts retrieved successfully',
      podcasts,
    });
  }
  catch (err) {
    console.error('Error retrieving podcasts:', err);
    return res.status(500).json({ message: 'Something went wrong while retrieving podcasts' });
  }
}

const getPodcastRssFeed = async (req, res) => {
  try {
    const db = getDB();
    const podcastCollection = db.collection('podcasts');
    const podcastId = req.params.id;

    if (!ObjectId.isValid(podcastId)) {
      return res.status(400).send('Invalid podcast ID');
    }

    const podcast = await podcastCollection.findOne({ _id: new ObjectId(podcastId) });

    if (!podcast) {
      return res.status(404).send('Podcast not found');
    }

    // Build RSS XML string - you can expand this with real episodes later
    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${podcast.title}</title>
    <link>${process.env.BASE_URL}/podcast/${podcastId}</link>
    <description>${podcast.description}</description>
    <image>
      <url>${podcast.coverImg}</url>
      <title>${podcast.title}</title>
      <link>${process.env.BASE_URL}/podcast/${podcastId}</link>
    </image>
    <item>
      <title>Sample Episode</title>
      <description>This is a sample episode description</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${podcastId}-episode-1</guid>
      <!-- Add enclosure tag here if you have audio files -->
    </item>
  </channel>
</rss>`;

    res.set('Content-Type', 'application/rss+xml');
    return res.status(200).send(rssXml);

  } catch (error) {
    console.error('Error generating RSS feed:', error);
    return res.status(500).send('Server error');
  }
};

const getPodcastById = async (req, res) => {
  const { id } = req.params;

  try {
    const db = getDB();

    const podcastCollection = db.collection('podcasts');
    const podcast = await podcastCollection.findOne({ _id: new ObjectId(id) });

    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    return res.status(200).json({
      message: 'Podcast retrieved successfully',
      podcast,
    });
  } 
  catch (err) {
    console.error('Error retrieving the podcast:', err);
    return res.status(500).json({ message: 'Something went wrong while retrieving the podcast' });
  }
}

const deletePodcast = async (req, res) => {
  const { id } = req.params;
  try {
    const db = getDB();
    const podcastCollection = db.collection('podcasts');

    const podcast = await podcastCollection.findOne({ _id: new ObjectId(id) });

    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    // Delete the podcast
    await podcastCollection.deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json({
      message: 'Podcast deleted successfully',
    });
  } 
  catch (err) {
    console.error('Error deleting the podcast:', err);
    return res.status(500).json({ message: 'Something went wrong while deleting the podcast' });
  }
}

const profileViews = async (req, res) => {
  try {
    // Assuming only one podcast profile exists
    const result = await podcast.findOneAndUpdate(
      {}, // No filter needed if only one profile
      { $inc: { views: 1 } },
      { returnDocument: 'after' } // Return updated document
    );

    if (!result.value) {
      return res.status(404).json({ message: 'Podcast profile not found' });
    }

    res.status(200).json({
      message: 'Podcast profile views updated successfully',
      podcast: result.value,
    });

  } catch (error) {
    console.error('Error updating profile views:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  newPodcast,
  getPodcasts,
  getPodcastRssFeed,
  getPodcastById,
  deletePodcast,
  profileViews,
};