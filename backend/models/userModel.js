import mongoose from 'mongoose';
/*
The model you define in the Node.js server is an abstraction of the data in your MongoDB database, 
which is represented as a document. 
Because of this abstraction, you may use the “Mongoose” schemas to construct a blueprint of how you want the added data to look and behave.
*/
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

export default User;