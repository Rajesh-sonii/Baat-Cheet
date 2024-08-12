const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL)

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    unique: true
  },
  fullName: String,
  password: String,
  image: {
    type: String
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
  friendRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FriendRequests',
    default: []
  }],
  sentRequests: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FriendRequests',
    default: [] 
  }],
  blocked: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: []
  }],
},
  { timestamps: true }

);

userSchema.plugin(plm)
module.exports = mongoose.model('User', userSchema)