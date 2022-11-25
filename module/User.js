const mongoose = require('mongoose');
 const { Schema } = mongoose;

const UserSchema = new Schema({
  Name : String,
  Email: String,
  Phone: String,
  Address: String,
  Password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;