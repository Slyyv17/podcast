require('dotenv').config();
const express = require('express');
const app = express();
const { connectToMongo } = require('./config/config');
const cors = require('cors');

connectToMongo(); 
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})