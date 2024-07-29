const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/baat-cheet')

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
  }]
},
  { timestamps: true }

);

userSchema.plugin(plm)
module.exports = mongoose.model('User', userSchema)