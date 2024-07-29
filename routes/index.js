var express = require('express');
const passport = require('passport');
var router = express.Router();

const upload = require('./multer')
const userSchema = require('./users')
const messageSchema = require('./messages');
const friendRequests = require('./friendrequests');
const Strategy = require('passport-local').Strategy
passport.use(new Strategy(userSchema.authenticate()))

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// rendering the login page
router.get('/login', function (req, res, next) {
  const message = req.flash('error');
  res.render('login', { message });
});

// rendering the signup page
router.get('/signup', function (req, res, next) {
  res.render('signup');
});

// rendering the profile page
router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userSchema.findOne({ username: req.session.passport.user });
  res.render('profile', { user });
});

// rendering the chat page
router.get('/chat', isLoggedIn, async function (req, res, next) {
  const user = await userSchema.findOne({ username: req.session.passport.user }).populate('friends', ['_id', 'username', 'image']).populate({ path: 'friendRequests', model: 'FriendRequests', populate: { path: 'sender_id', model: 'User' }, match: { status: 'pending' } }).populate({ path: 'sentRequests', model: 'FriendRequests', populate: { path: 'receiver_id', model: 'User' }, match: { status: 'pending' } });
  console.log(user.friendRequests);
  res.render('chats', { user });
});

// getting all the chats between two users
// router.get('/getchats', isLoggedIn, async function (req, res) {
//   var { receiver_id, sender_id } = req.headers;
//   const messages = await messageSchema.find({ $or: [{ sender_id: receiver_id, receiver_id: sender_id }, { sender_id: sender_id, receiver_id: receiver_id }] });
//   res.json(messages);
// });

// searching for a friend
router.get('/searchfriend', isLoggedIn, async function (req, res) {
  try {
    const { q } = req.query;
    const user = await userSchema.findOne({ username: req.session.passport.user });
    const users = await userSchema.find({ username: { $regex: q, $options: "i" } });
    let newUsers = [];
    for (i = 0; i < users.length; i++) {
      for (j = 0; j < user.friends.length; j++) {
        if (JSON.stringify(users[i]._id) != JSON.stringify(user.friends[j])){
          console.log(user.friends[j]);
          console.log(users[i]._id);
          newUsers.push(users[i]); 
        }
      }
    }
    if (newUsers) {
      return res.status(200).send(newUsers);
    }
    else res.status(404).send("nothing foud!");
  } catch (error) {
    res.send('something went wrong!');
  }
})

// sending a friend request to a user
router.get('/makefriend', isLoggedIn, async function (req, res, next) {

  const { receiver_id } = req.body;
  const currUser = req.express.session.user;
  // const currUser = "66a3e9d2924cfc2bbdb21e80";

  const check_sender = await userSchema.findOne({ _id: currUser });
  if (!check_sender) {
    return res.status(404).send("invalid request");
  }
  const check_receiver = await userSchema.findOne({ _id: receiver_id })
  if (!check_receiver) {
    return res.status(404).send("invalid request");
  }

  try {
    const request = await friendRequests.create({
      sender_id: currUser,
      receiver_id: receiver_id
    });

    const them = await userSchema.findByIdAndUpdate(receiver_id, { friendRequests: request._id });
    const us = await userSchema.findByIdAndUpdate(currUser, { sentRequests: request._id });
    res.status(200).send('Friend request sent!');
  } catch (error) {
    return res.status(500).send("Something went wrong on our side");
  }
})

// accepting/rejecting the received friend request
router.post('/checkoutRequest', isLoggedIn, async function (req, res) {
  const { acceptReject, request_id } = req.body;
  if (!acceptReject || !request_id) {
    return res.status(400).send('invalid request');
  }
  // const user = await userSchema.findOne({ username: req.session.passport.user });
  const request = await friendRequests.findOne({ _id: request_id });
  const them = await userSchema.findOne({ _id: request.sender_id });
  const us = await userSchema.findOne({ _id: request.receiver_id });

  console.log(them);
  console.log(us);
  console.log(request);

  if (acceptReject == 'rejected') {
    request.status = acceptReject;
  }
  else if (acceptReject == 'accepted') {
    request.status = acceptReject;
    them.friends.push(request.receiver_id);
    us.friends.push(request.sender_id);
    await them.save();
    await us.save();
  }
  else {
    return res.status(400).send('invalid request');
  }
  await request.save();
  return res.status(200).send("operation performed successfully");
})

// sending a message
// router.post('/messages', isLoggedIn, async function (req, res, next) {
//   const { sender_id, receiver_id, message } = req.body;
//   const newMessage = await messageSchema.create({
//     sender_id, receiver_id, message
//   });
//   res.send(newMessage);
// });

// uploading a profile photo from the available avatar options 
router.post('/upload-pic', isLoggedIn, async function (req, res) {
  const { file } = req.headers;
  const name = file.split('3000');
  try {
    const user = await userSchema.findOne({ username: req.session.passport.user });
    const newUser = await userSchema.updateOne({ _id: user._id }, { $set: { image: name[1] } });

    if (!newUser) return res.status(404).send('something went wrong!');
  }

  catch (error) {
    return res.status(400).send('Something went wrong!');
  }

  res.redirect('/chat');
})

// uploading a photo from the user's computer
router.post('/upload', isLoggedIn, upload.single('file'), async function (req, res, next) {

  try {
    const user = await userSchema.findOne({ username: req.session.passport.user });
    const newUser = await userSchema.updateOne({ _id: user._id }, { $set: { image: req.file.filename } });

    if (!newUser) return res.status(404).send('something went wrong!');
    // user.image = req.file.filename;
    // await user.save();
  }

  catch (error) {
    return res.status(400).send('Something went wrong!');
  }
  res.redirect('/chat');
});

// logging-in the user
router.post('/login', passport.authenticate('local', {
  successRedirect: '/chat',
  failureRedirect: '/login',
  failureFlash: true,
  successFlash: true
}), function (req, res, next) { });

// signing-up the user
router.post('/signup', async function (req, res, next) {
  const { username, fullName, email } = req.body;
  const user = await userSchema.findOne({ $or: [{ username: username }, { email: email }] });
  // try {
  if (user) {
    return res.status(400).send("User Already Exists");
  }

  const newUser = new userSchema({ username, fullName, email });
  userSchema.register(newUser, req.body.password)
    .then(function () {
      passport.authenticate('local')(req, res, function () {
        res.redirect('/profile')
        // res.status(200).send("user created successfully");
      })
    })
  // } catch (error) {

  // }
});

// loggin the user out
router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout((err) => {
    if (err) return next(err)
    return res.redirect('/')
  })
});

// checking if the user is logged-in or not
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next()
    return;
  }
  else {
    res.redirect('/');
  }
}
module.exports = router;
