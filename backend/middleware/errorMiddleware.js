/*
The  NotFound function will be called
if no other middleware has handled the request 
(which means the url/request is wrong
ex: http://localhost:5000/products => correct request
    http://localhost:5000/product  => wrong request
)
and it will create a new error object and set the code to 404, 
which is a not found error.
*/
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
  };
  
/*
Now to overwrite the default express error handler, we're going to create our custom errorhandler to make it more elegant and clear at the development time.

The errorHandler middleware function will work in an Express.js application 
when there is an error in any of the routes or middleware functions that come before it in the middleware chain.
When an error occurs/throw in a route or middleware function, it can be passed to the next middleware function by calling next(err). 
If the next middleware function in the chain is the errorHandler, 
it will receive the error as its first argument and can handle it appropriately.
The errorHandler middleware function is usually the last middleware function in the chain, so any errors that are not caught by previous middleware functions will be handled by this function. This function can then send an appropriate response to the client, log the error, or perform any other necessary actions.
*/  
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // If Mongoose not found error, set to 404 and change message
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
        /**
         * NOTE: _ err.stack shows the exact file and line number the error occured. 
         * This is only needed in developement mode to debug your code. It becomes dangerous when your project structure is exposed on production
         */
    });
};

export { notFound, errorHandler };