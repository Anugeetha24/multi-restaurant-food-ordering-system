const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Database Connected Successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Connection failed:', error.message);
    process.exit(1);
  });
