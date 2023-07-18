import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id').get(getProductById);
export default router;
/*
If we kept all of our routes in Server.js, it would get very long and very messy.
So Express has a router that we can use so we can put our routes in separate files.
*/
/*
Controller / Controller function is nothing but the logic/ the functionality of the Route handler.
Using Controller make Routes more organized and cleaner.
In simple word we are seperating the logic of the route in another file called controller.
----------------------------------------------------------------------------------------------------
Controller + Route = cleaner code
----------------------------------------------------------------------------------------------------
ex:
without controller:-
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);
with controller:-
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});
router.route('/').get(getProducts);
*/