const io = require('socket.io')();
const userSchema = require('./routes/users')
var usp = io.of('/user-namespace')
const messageSchema = require('./routes/messages');

usp.on('connection', async (socket) => {
    console.log('User connected');

    // const userId = socket.handshake.auth.token;
    // const user = await userSchema.findOneAndUpdate({_id: userId}, {$set:{is_online: '1'}});

    socket.on('disconnect', async function () {
        console.log('User Disconnected');
        // const user = await userSchema.findByIdAndUpdate({_id: userId}, {$set:{is_online: '0'}});
    });

    socket.on('newChat', (data) => {
        // console.log('message: ' + data.message);
        socket.broadcast.emit('loadNewChat', data);
    });

    socket.on('loadChats', async function (data) {
        const messages = await messageSchema.find({ $or: [{ sender_id: data.receiver_id, receiver_id: data.sender_id }, { sender_id: data.sender_id, receiver_id: data.receiver_id }] });
        // res.json(messages);
        socket.emit('getChats', messages);
    })

    socket.on('sendMessage', async function (data) {
        const {sender_id, receiver_id, message} = data;
        const newMessage = await messageSchema.create({
            sender_id, receiver_id, message
        });

        socket.emit('sentMessage', newMessage);
    })
});

module.exports = {
    io
};
