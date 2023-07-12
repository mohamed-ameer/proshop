/*
In order to have kind of an elegant error handling solution, 
we need to wrap the routes handler in an async handler so that we don't have to use try & catch.

asyncHandler saves you writing your own try/catch for async/await and passes error on to next

//when using async handler
//wrap the async function with asynchandler
//like this asyncHandler(async fn())
-----------------------------------------------------------------
With asyncHandler you'd need:
express.get('/', asyncHandler(async (req, res, next) => {
    const bar = await foo.findAll();
    res.send(bar)
}))
Without asyncHandler you'd need:
express.get('/',(req, res, next) => {
    foo.findAll()
    .then ( bar => {
       res.send(bar)
     } )
    .catch(next); // error passed on to the error handling route
})
*/

/*
So basically,we just have a function that takes in request response and next
as an argument and it's going to resolve a promise.
And if it resolves, it's going to call next, which then calls the next piece of middleware.
So this way we don't have to have all these try catch blocks.
*/
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

export default asyncHandler;