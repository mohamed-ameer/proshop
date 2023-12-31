import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
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
//Body parser middleware 
//these two lines of middlewares allow us to parse/get/read tha data inside the request Body(the Body data)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Cookie parser middleware
//this middleware allow us to parse the cookie from the request object
app.use(cookieParser());
// MIDDLEWARES (middleware functions and routes)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
/*
We will add PayPal Route so PayPal can get the clientID via it,
and the reason for this is because we can't put our client ID in the front end.
you don't want it on the client side because you don't want people getting that.
so we're storing it in our Env file and then we're creating a route so PayPal can then get that clientID and then use it.
*/
app.get('/api/config/paypal', (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);
// Upload static files
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  //set the static folder (react build folder with all our static assets) 
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  //any route that is not api will be redirected to index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}
// ERROR HANDLER MIDDLEWARE (Last middleware to use)
// add errorHandler middleware function to the middleware chain
app.use(notFound);
app.use(errorHandler);
// start the server
app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);