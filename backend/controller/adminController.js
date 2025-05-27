const { getDB } = require('../config/config');

const getAllUsers = async (req, res) => {
    try {
        const db = getDB();
        const users = await db.collection('users').find().toArray();
        res.status(200).json(users);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getNumberOfUsers = async (req, res) => {
    try {
        const db = getDB();
        const count = await db.collection('users').countDocuments();
        res.status(200).json({ count });
    }
    catch (error) {
        console.error('Error counting users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getNumberOfSubscribers = async (req, res) => {
    const db = getDB();
  
    try {
      const totalSubscribers = await db.collection('admins').aggregate([
        {
          $project: {
            numberOfSubscribers: { $size: { $ifNull: ['$subscribers', []] } }
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$numberOfSubscribers' }
          }
        }
      ]).toArray();
  
      const subscribers = totalSubscribers[0]?.total || 0;
  
      res.status(200).json({ subscribers });
    } catch (error) {
      console.error('Error counting subscribers:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
};
  
const getNumberOfEpisodes = async (req, res) => {
    const db = getDB();
  
    try {
      const totalEpisodes = await db.collection('episodes').countDocuments();
      res.status(200).json({ totalEpisodes });
    } catch (error) {
      console.error('Error counting episodes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const recentEpisodes = async (req, res) => {
    const db = getDB();
  
    try {
      const episodes = await db.collection('episodes')
        .find()
        .sort({ createdAt: -1 })
        .limit(3)
        .toArray();
  
      res.status(200).json(episodes);
    } catch (error) {
      console.error('Error fetching recent episodes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    getNumberOfUsers,
    getNumberOfSubscribers,
    getNumberOfEpisodes,
    recentEpisodes,
}