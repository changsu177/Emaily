const express = require('express');
const mongoose = require('mongoose');

const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

const bodyParse = require('body-parser');




mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParse.json());

// three middleware
app.use (
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes files export a function
//require statement here turns into a function and is called with the express object (app)
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

//handle the prodution side
if(process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like our main.js file or main.css files
  app.use(express.static('client/build'));
  // Express will serve up the index.html file if it does not recognize the route
  //catchall case
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client','build','index.html'));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
