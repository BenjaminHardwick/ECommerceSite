// We are using EcmaScript modules
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageRoutes from './routes/imageRoutes.js';
// cross origin resource sharing (required)
import cors from 'cors';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
connectDB();
const app = express();
// Cross-origin resource sharing - requirement.
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running!');
});
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/image', imageRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PP_CLIENT_ID));
const PORT = process.env.PORT || 5000;
// using path to bring in the folder '/imgUploads' to store the images inside of (taken from stackoverflow)
const __dirname = path.resolve();
app.use('/imgUploads', express.static(path.join(__dirname, '/imgUploads')));

app.use(notFound);

app.use(errorHandler);

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port: ${PORT}`)
);
