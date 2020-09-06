const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose doc
const userSchema = new Schema({
  googleId: String,
  credits: { type : Number, default : 0 }
});
// tell mongoose we want to create a new collection of users
// won't override of the collection has already existed
//create the model class
mongoose.model('users', userSchema);
