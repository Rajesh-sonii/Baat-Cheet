var express = require('express');
const passport = require('passport');
var router = express.Router();

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;
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
  const user = await userSchema.findOne({ username: req.session.passport.user })
    .populate('friends', ['_id', 'username', 'image'])
    .populate({
      path: 'friendRequests', model: 'FriendRequests',
      populate: { path: 'sender_id', model: 'User' }, match: { status: 'pending' }
    })
    .populate({
      path: 'sentRequests', model: 'FriendRequests',
      populate: { path: 'receiver_id', model: 'User' }, match: { status: 'pending' }
    })
    .populate('blocked', ['_id', 'username', 'image']);

  res.render('chats', { user });
});

// searching for a friend
router.get('/searchfriend', isLoggedIn, async function (req, res) {
  const { q } = req.query;
  try {
    if (q.length > 0) {
      const user = await userSchema.findOne({ username: req.session.passport.user })
        .populate('friends', ['_id', 'username', 'image'])
        .populate({
          path: 'friendRequests', model: 'FriendRequests',
          populate: { path: 'sender_id', model: 'User' }, match: { status: 'pending' }
        })
        .populate({
          path: 'sentRequests', model: 'FriendRequests',
          populate: { path: 'receiver_id', model: 'User' }, match: { status: 'pending' }
        });

      const users = await userSchema.find({
        username: { $regex: q, $options: "i", $ne: user.username },
        _id: {
          $nin: [
            ...user.friends.map(id => id),
            ...user.friendRequests.map(req => req.sender_id),
            ...user.sentRequests.map(req => req.receiver_id)
          ]
        }
      });

      if (users) {
        return res.status(200).send(users);
      }
      else return res.status(404).send("nothing found!");
    }
  } catch (error) {
    return res.send('something went wrong!');
  }
})

// sending a friend request to a user
router.post('/makefriend', isLoggedIn, async function (req, res, next) {

  const { receiver_id } = req.headers;
  const currUser = req.session.passport.user;
  // const currUser = "66a8b10ced2ff17ea7022a3c";

  const check_sender = await userSchema.findOne({ username: currUser });
  if (!check_sender) {
    return res.status(404).send("invalid request");
  }
  const check_receiver = await userSchema.findOne({ _id: receiver_id })
  if (!check_receiver) {
    return res.status(404).send("invalid request");
  }

  try {
    const request = await friendRequests.create({
      sender_id: check_sender._id,
      receiver_id: receiver_id
    });

    const them = await userSchema.findByIdAndUpdate(receiver_id, { friendRequests: request._id });
    const us = await userSchema.findByIdAndUpdate(check_sender._id, { sentRequests: request._id });
    if (them && us) {
      return res.json({ username: us.username, image: us.image, id: us._id, tusername: them.username, timage: them.image, tid: them._id, rid: request._id})
    }
    else throw new error;

  } catch (error) {
    return res.status(500).send("Something went wrong on our side");
  }
})

router.post('/cancelRequest', isLoggedIn, async function (req, res, next) {

  const { request_id } = req.headers;

  if (!request_id) {
    return res.status(404).send('invalid request');
  }

  try {
    const request = await friendRequests.findOneAndDelete({ _id: request_id });
    if (!request) {
      throw new error("Something went wrong!");
    }

    return res.status(200).send("operation performed successfully");

  } catch (error) {
    return res.status(500).send('Something went wrong!');
  }
})

// accepting/rejecting the received friend request
router.post('/checkoutRequest', isLoggedIn, async function (req, res) {
  const { acceptReject, request_id } = req.body;
  if (!acceptReject || !request_id) {
    return res.status(400).send('invalid request');
  }

  try {
    // const user = await userSchema.findOne({ username: req.session.passport.user });
    const request = await friendRequests.findOne({ _id: request_id });
    const them = await userSchema.findOne({ _id: request.sender_id });
    const us = await userSchema.findOne({ _id: request.receiver_id });
    
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
    return res.status(200).send({id: us._id, username: us.username, image: us.image, tid: them._id, tusername: them.username, timage: them.image});
  } catch (error) {
    res.status(500).send("Something went wrong!");
  }
})

// sending a message
router.post('/messages', isLoggedIn, async function (req, res, next) {
  try {
    const { sender_id, receiver_id, message } = req.body;
    if (sender_id || receiver_id || message.length > 0) {
      const newMessage = await messageSchema.create({
        sender_id, receiver_id, message
      });
      return res.send(newMessage);
    }
    else {
      return res.status(400).send("please enter a valid message!");
    }
  } catch (error) {
    return res.status(500).send("Something went wrong!");
  }
});

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
router.post('/block', isLoggedIn, async function (req, res) {
  const { user_id } = req.headers;
  if (user_id == undefined) return res.status(404).send('please select a valid user');
  try {
    const user = await userSchema.findOne({ username: req.session.passport.user }).populate('friends', ['_id']);
    const blockable = user.friends.filter((friend) => {
      return friend._id == user_id;
    });
    if (blockable) {
      const blocked = user.friends.filter((friend) => {
        return friend._id != user_id;
      })
      user.friends = blocked;
      user.blocked.push(user_id);
      await user.save();
      return res.status(200).send('blocked');
    }
    else {
      return res.status(404).send('User is not in your frinds list!');
    }
  }

  catch (err) {
    return res.status(500).send('Something went wrong!');
  }
})
router.post('/unblock', isLoggedIn, async function (req, res) {
  const { user_id } = req.headers;
  if (user_id == undefined) return res.status(404).send('please select a valid user');
  try {
    const user = await userSchema.findOne({ username: req.session.passport.user }).populate('blocked', ['_id']);
    const unblockable = user.blocked.filter((friend) => {
      return friend._id == user_id;
    });
    if (unblockable) {
      const blocked = user.blocked.filter((friend) => {
        return friend._id != user_id;
      })
      user.blocked = blocked;
      user.friends.push(user_id);
      await user.save();
      return res.status(200).send('blocked');
    }
    else {
      return res.status(404).send('User is not in your frinds list!');
    }
  }

  catch (err) {
    return res.status(500).send('Something went wrong!');
  }
})

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
