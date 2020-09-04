// export a class or a component name the file with capital letter
// whereas for functions , a little snippet ,use lower-case letter
//call next when the middleware function is completed
// the next finc will hand the request off to the next middleware
module.exports = ( req, res, next) => {
  if( ! req.user ){
    return res.status(401).send({error: 'you must log in'});
  }
  next();
};
