const { getDB } = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generateTokenUser = require('../utils/generateTokenUser');

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

const addUser = async (req, res) => {
  const { fullname, email, password } = req.body;

  try {
    const db = getDB();
    const userCollection = db.collection('users');

    // Check if user already exists
    const existingUser = await userCollection.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const result = await userCollection.insertOne({
      fullname,
      email,
      password: hashedPassword,
      role: 'user',
    });

    const insertedUser = await userCollection.findOne({ _id: result.insertedId });

    // Generate token using the actual user object
    const token = generateTokenUser(insertedUser);

    res.status(201).json({
      message: 'User created',
      token,
      user: {
        id: insertedUser.id,
        fullname: insertedUser.fullname,
        email: insertedUser.email,
        role: insertedUser.role,
      }
    });
  }
  catch (err) {
    console.error('Error creating user', err);
    return res.status(500).json({ message: 'Error creating user', error: err.message });
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDB();
    const userCollection = db.collection('users');

    // Check if user exists
    const user = await userCollection.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateTokenUser(user);
    return res.status(200).json({
      message: 'User logged in',
      token,
    });
  }
  catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
}

module.exports = {
    addAdmin,
    loginAdmin,
    addUser,
    loginUser,
};