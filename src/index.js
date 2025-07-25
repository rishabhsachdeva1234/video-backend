import { config } from 'dotenv';
import mongoose from 'mongoose';
import { DB_NAME } from './constants';

(async () => {
  try {
    const dbUrl = `${process.env.MONGODB_URI}/${DB_NAME}`;
    await mongoose.connect(dbUrl);
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
})();
