/*
we are gonna use the generateJWT logic many time with the login logic and the registeration logic,
so for clean code sake we will separate this generateJWT logic in separate help method (util file).

Now we're not repeating ourselves.
We're sticking to the dry principle.
And instead of having all this code twice, 
we have a single function that we can call in both places(the login logic and the registeration logic).
*/
import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  //generate a token  
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  // Set JWT as an HTTP-Only cookie
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
  });
};

export default generateToken;