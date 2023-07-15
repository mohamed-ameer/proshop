import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
/*
the config() method takes a .env file path as an argument, 
it parses it and sets environment vars defined in that file in process.env
*/
/*
You don't need to write require('dotenv').config() in every file. 
Just include this as the top statement in the index.js/server.js or the main file that got executed at the very first place when you run your program.
*/
dotenv.config();
const port = process.env.PORT || 5000;
//connect to mongodb
connectDB();
// init app
const app = express();
app.get('/', (req, res) => {
  res.send('API is running...');
});
// MIDDLEWARES (middleware functions and routes)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use(notFound);
// ERROR HANDLER MIDDLEWARE (Last middleware to use)
// add errorHandler middleware function to the middleware chain
app.use(errorHandler);
// start the server
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);