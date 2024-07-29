const mongoose = require('mongoose')

const friendRequests = mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
});

module.exports = mongoose.model('FriendRequests', friendRequests);