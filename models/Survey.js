const mongoose = require('mongoose');
const {Schema} = mongoose;
const RecipientShema = require('./Recipient');
// mongo size limit for a single record = 4mb (megabites)
// mongoose doc
const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // sub document collection.
  recipients: [RecipientShema],
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  // referance to a user.. relationship field
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  dateSent: Date,
  lastResponded: Date

});
// load up to the mongoose libary
// tell mongoose we want to create a new collection of users
// won't override of the collection has already existed
//create the model class
//name of the model class, name of the schema
mongoose.model('surveys', surveySchema);


//web hook : is any time that one server makes some communicatoin
// to another server because of some events occurred on the
//first one

//for this app .. sendgrid knows who cliked the link we sent out
//and we need to make it send a message to our server telling us
// about the click
