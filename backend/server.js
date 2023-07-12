import express from 'express';
import products from './data/products.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
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
connectDB();//connect to mongodb
const app = express();

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
);