const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/affordmed?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.2.2';

const connection = mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

module.exports = connection;
