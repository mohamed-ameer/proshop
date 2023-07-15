import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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
// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
//.pre() allows us to do something on the data before we save it in the database.
//before saving the registered data,Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  /*
  if we're just saving some user data, but we're not dealing with the password, 
  then it's just going to move on(it's just going to the next piece of middleware).
  */
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;