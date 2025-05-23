const getDB = require('../config/config');

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

module.exports = {
    getAllUsers,
}