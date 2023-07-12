import mongoose from 'mongoose';
/*
Why do we need a separate schema for reviews,
where as we use an array of objects for orderItems?
Why can't we use array of objects for reviews also?
ans:
In my opinion, it depends on the structure of the data. 
If a model can exist independently, it should have its own schema (file). 
However, if it is just a part of another object that cannot function independently, 
then there is no point in separating it out.
----------------------------------------------------------------
According to the docs, it's exactly the same. 
However, using a Schema would add an _id field as well (as long as you don't have that disabled), 
and presumably uses some more resources for tracking subdocs.
If you have schemas that are re-used in various parts of your model, 
then it might be useful to define individual schemas for the child docs so you don't have to duplicate yourself.
*/
/*
The model you define in the Node.js server is an abstraction of the data in your MongoDB database, 
which is represented as a document. 
Because of this abstraction, you may use the “Mongoose” schemas to construct a blueprint of how you want the added data to look and behave.
*/
const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;