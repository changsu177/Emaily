
const keys = require('../config/keys');
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');
// when making post requests to use Express Sever, it does not by default
//parse the request payload

//Parse incoming request bodies in a middleware before your handlers,
//available under the req.body property.

//https://stripe.com/docs/api/charges/create  create a charge


//when reaching out to the other api : asynchronous ..
// promise, callback function, asunc and await


// express rout handlers (app.post, app.get) can take in arbitrary number of middlewares
// the only requirement if that one of the middlewares should process the
//request and send the users back a response.
module.exports = app => {
  app.post('/api/stripe', requireLogin,  async (req,res) => {
   const charge = await stripe.charges.create({
      amount:500,
      currency: 'usd',
      description: '$5 for 5 creadits',
      // the usage of body-parsing
      source : req.body.id
    });
    //req.user get access to the user model .. set up by passport,
    req.user.credits += 5;
    // save the change in db .. async request
    const user = await req.user.save();

    // response to the request, send back the data that we want to communicate
    // with the browser
    res.send(user);

  });
};
