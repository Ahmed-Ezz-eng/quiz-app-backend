import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/usersRoute.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json({ extended: true, limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

const url = process.env.DB_URI;
const port = process.env.PORT || 4000;

mongoose.set('strictQuery', false);
mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () =>
      console.log(`Server is running on http://localhost:${port}`)
    );
  })
  .catch((error) => {
    console.log(`Error when connect to database ${error}`);
  });

app.use('/api/users', userRoute);

