// server/test-mongo.js
import mongoose from 'mongoose';
import Contact from './models/Contact.js';
import dotenv from 'dotenv';  
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  connectTimeoutMS: 30000,
}).then(async () => {
  await new Contact({
    name: 'Test',
    email: 'test@example.com',
    phone: '+1234567890',
    message: 'Test message',
  }).save();
  console.log('MongoDB save successful');
  mongoose.disconnect();
}).catch(console.error);