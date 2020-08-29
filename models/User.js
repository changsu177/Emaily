const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String
});
// tell mongoose we want to create a new collection of users
// won't over write of the collection has already existed
//create the model class
mongoose.model('users', userSchema);
