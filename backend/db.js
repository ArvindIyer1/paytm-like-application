const mongoose = require("mongoose");

mongoose.connect("");


const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true, trim: true, lowercase: true, minLength: 4, maxLength: 40 },
  password: { type: String, required: true, unique: true, minLength: 6 },
  firstName: { type: String, required: true },
  lastName: {
    type: String,
    required: true
  }


});


const User = mongoose.model('User', userSchema)

const accountSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const Account = mongoose.model('Account', accountSchema);


module.exports = {
  User,
  Account
}