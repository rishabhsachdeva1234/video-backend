import dotenv from 'dotenv';
import { connectDB } from './db/index.js';
import { app } from './app.js';
dotenv.config({
  path: '.env',
});

console.log('FROM INDEX:', process.env.CLOUDINARY_API_KEY);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.log('MONGO DB CONNECTION FAILED!!!', err);
  });
