const { getDB } = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      email: admin.email,
      role: 'admin'
    },
    process.env.JWT_SECRET_ADMIN,
    {
      expiresIn: process.env.JWT_EXPIRATION_ADMIN || '2d',
    }
  );
};

async function addAdmin(req, res) {
  const { fullname, email, password } = req.body;

  try {
    const db = getDB();
    const adminCollection = db.collection('admins');

    // Check if admin already exists
    const existingUser = await adminCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin
    const result = await adminCollection.insertOne({
      fullname,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const insertedAdmin = await adminCollection.findOne({ _id: result.insertedId });

    // Generate token using the actual admin object
    const token = generateToken(insertedAdmin);

    res.status(201).json({
      message: 'Admin created',
      token,
      admin: {
        id: insertedAdmin.id,
        fullname: insertedAdmin.fullname,
        email: insertedAdmin.email,
        role: insertedAdmin.role,
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin', error: err.message });
  }
}

const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const db = getDB();
        const adminCollection = db.collection('admins');

        // Check if admin exists
        const admin = await adminCollection.findOne({
            email,
        })

        if (!admin) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate token
        const token = generateToken(admin);
        res.status(200).json({
            message: 'Admin logged in',
            token,
        });
    }
    catch (err) {
        console.error('Error logging in admin:', err);
        res.status(500).json({ message: 'Error logging in admin', error: err.message });
    }
}

module.exports = {
    addAdmin,
    loginAdmin,
};