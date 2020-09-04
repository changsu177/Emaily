const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req,res) => {
      // after the use has signed in, redirect to the dashboard
      res.redirect('/surveys');
    }
  );

  app.get('/api/logout', (req, res) => {

    //logout is automatically attached to req by passport
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
