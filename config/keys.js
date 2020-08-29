// figure out what set of credentials to return
if(process.env.NODE_ENV == 'production'){ // when running on heroku, it will automatically set this
  // variable to  'production'.
  // we are in production - return the prod set of keys

  module.exports = require('./prod')
} else { // on local machine
  // we are in development - return the dev keys
 module.exports = require('./dev')
}
