const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


// the model class
const User = mongoose.model('users');

// the 1st param user is the 2nd param in done func below
passport.serializeUser ( (user, done) => {
  // stuff the id into the cookie. turn a user model to an id
  done(null, user.id);
});
// take the id that we previously stuff into the cookie and turn it back into a
// actual user model
passport.deserializeUser ( (id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });

});


passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      // the query doesn't return a user, instead, the query returns a promise
      // which is a tool that we use with js for handling asynchronous code
      User.findOne({googleId: profile.id}).then(existingUser => {
        if (existingUser) {
          //we already have a record with the given profile Id
          // tell the passport we are done
          // the 1st param is an error object
          done(null, existingUser);
        } else {
          // we don't have the record with this id, create a new one
          // to create model instance
          // and save it to the mongdb database
          new User({googleId: profile.id}).save().then(user => done(null, user));
        }
      });

    }
  )
);
