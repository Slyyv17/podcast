const express = require('express');
const cors = require('cors');
const { connectToMongo } = require('./config/config');
const authRoutes = require('./routes/authRoute');
const podcastRoute = require('./routes/podcastRoute');

require('dotenv').config();
const app = express();

connectToMongo();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/auth/admin', authRoutes);
app.use('/api/v1', podcastRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
