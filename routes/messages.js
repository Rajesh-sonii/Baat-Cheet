const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    sender_id:{
        type: String,
        required: true
    },

    receiver_id:{
        type: String,
        required: true
    },

    message:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Messages', messageSchema);