const { getDB } = require('../config/config');
const { ObjectId } = require('mongodb');

const likePodcast = async (req, res) => {
  const userId = req.user.id;
  const podcastId = req.params.podcastId;

  try {
    const db = getDB();
    const userCollection = db.collection('users');

    // Check if user exists
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if podcast exists
    const podcastCollection = db.collection('podcasts');
    const podcast = await podcastCollection.findOne({ _id: new ObjectId(podcastId) });

    if (!podcast) {
      return res.status(404).json({ message: 'Podcast not found' });
    }

    // Check if user already liked it
    const alreadyLiked = podcast.userLiked.some(
      (uid) => uid.toString() === userId
    );

    if (alreadyLiked) {
      return res.status(400).json({ message: 'You have already liked this podcast' });
    }

    // Update podcast with like
    await podcastCollection.updateOne(
      { _id: new ObjectId(podcastId) },
      {
        $push: { userLiked: new ObjectId(userId) },
        $inc: { likes: 1 },
        $set: { updatedAt: new Date() },
      }
    );

    return res.status(200).json({ message: 'Podcast liked successfully' });

  } catch (err) {
    console.error('Error liking podcast:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const dislikePodcast = async (req, res) => {
    const userId = req.user.id;
    const podcastId = req.params.podcastId;

    try {
        const db = getDB();
        const userCollection = db.collection('users');
        const podcastCollection = db.collection('podcasts');

        // Check if user exists
        const user = await userCollection.findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // check if podcast exists
        const podcast = await podcastCollection.findOne({ _id: new ObjectId(podcastId) });
        if (!podcast) {
            return res.status(404).json({ message: 'Podcast not found' });
        }

        // Check if user already liked it
        const alreadyLiked = podcast.userLiked.some(
            (uid) => uid.toString() === userId
        );

        if (!alreadyLiked) {
            return res.status(400).json({ message: 'You have not liked this podcast yet' });
        }

        // Update podcast to remove like
        await podcastCollection.updateOne(
            { _id: new ObjectId(podcastId) },
            {
                $pull: { userLiked: new ObjectId(userId) },
                $inc: { likes: -1 },
                $set: { updatedAt: new Date() },
            }
        );
        
        return res.status(200).json({ message: 'Podcast disliked successfully' });
    }
    catch (err) {
        console.error('Error disliking podcast:', err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const subscribeToAdmin = async (req, res) => {
    try {
      const userId = new ObjectId(req.user.id);  
      const adminId = new ObjectId(req.params.adminId);
  
      const db = getDB();
      const adminCollection = db.collection('admins');
  
      const admin = await adminCollection.findOne({ _id: adminId });
  
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      // Ensure subscribers is an array
      if (!Array.isArray(admin.subscribers)) {
        admin.subscribers = [];
      }
  
      // Check if user is already subscribed
      const alreadySubscribed = admin.subscribers.some(sub => sub.toString() === userId.toString());
      if (alreadySubscribed) {
        return res.status(400).json({ message: 'Already subscribed to this admin' });
      }
  
      // Update admin's subscriber list
      await adminCollection.updateOne(
        { _id: adminId },
        { $push: { subscribers: userId } }
      );
  
      return res.status(200).json({ message: 'Subscribed successfully' });
    } catch (err) {
      console.error('Error subscribing', err);
      return res.status(500).json({ message: 'Something went wrong' });
    }
};

const unsubscribeFromAdmin = async (req, res) => {
  try {
    const userId = new ObjectId(req.user.id);  // Ensure it's an ObjectId
      const adminId = new ObjectId(req.params.adminId);
      
    const db = getDB();
    const adminCollection = db.collection('admins');
    const admin = await adminCollection.findOne({ _id: adminId });

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    
    // Ensure subscribers is an array
    if (!Array.isArray(admin.subscribers)) {
        admin.subscribers = [];
    }

    // Check if user is subscribed
    const isSubscribed = admin.subscribers.some(sub => sub.toString() === userId.toString());
    if (!isSubscribed) {
      return res.status(400).json({ message: 'Not subscribed yet!' });
    }

    // Remove user from subscribers
    const updatedSubscribers = admin.subscribers.filter(
      (subscriberId) => subscriberId.toString() !== userId.toString()
    );

    await adminCollection.updateOne(
      { _id: adminId },
      { $set: { subscribers: updatedSubscribers } }
    );

    return res.status(200).json({ message: 'Unsubscribed successfully' });
  } catch (err) {
    console.error('Error unsubscribing:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
};

const deleteUserAcct = async (req, res) => {
  const userId = req.user.id;
  
  try {
    const db = getDB();
    const userCollection = db.collection('users');

    // Check if user exists
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete user account
    await userCollection.deleteOne({ _id: new ObjectId(userId) });
    return res.status(200).json({ message: 'Account deleted successfully' });
  }
  catch (err) {
    console.error('Error deleting your account:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

const getProfileData = async (req, res) => {
  const userId = req.user.id;

  try {
    const db = getDB();
    const userCollection = db.collection('users');

    // Fetch user profile data
    const user = await userCollection.findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching profile data:', err);
    return res.status(500).json({ message: 'Something went wrong' });
  }
}

module.exports = {
    likePodcast,
    dislikePodcast,
    subscribeToAdmin,
    unsubscribeFromAdmin,
    deleteUserAcct,
    getProfileData,
};
