/*
If we kept all of our routes in Server.js, it would get very long and very messy.
So Express has a router that we can use so we can put our routes in separate files.
*/
import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const router = express.Router();
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
    // res.status(404).json({ message: 'Product not found' });
    res.status(404);
    throw new Error('Resource not found');
  })
);

export default router;