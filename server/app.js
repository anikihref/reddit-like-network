const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/User.js');
const Post = require('./model/Post.js');
const cors = require('cors');
const { json } = require('express');

const app = express();
const PORT = 5000;
const CONNECT_URI =
  'mongodb+srv://anikihref:anikihref@cluster0.vlsmkyf.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(json());

app.post('/create-user', async (req, res) => {
  const userInfo = req.body;

  try {
    const user = await User.create({
      name: userInfo.name,
      age: userInfo.age,
      email: userInfo.email,
      username: userInfo.username,
      password: userInfo.password,
      pfp: userInfo.pfp,
      city: userInfo.pfp,
    });

    res.send(JSON.stringify(user));
  } catch (err) {
    console.log('create user error', err.message);

    res.send(err.message);
    res.status(400);
  }
});

app.get('/connect', async (req, res) => {
  try {
    await mongoose.connect(CONNECT_URI);

    console.log('connected');
    res.sendStatus(200);
  } catch (err) {
    res.send(err.message);
  }
});

app.post('/log-in', (req, res) => {
  const data = req.body;

  User.findOne(
    { username: data.username, password: data.password },
    function (err, user) {
      if (err) {
        console.log(err.message);
      } else {
        res.send(JSON.stringify(user));
      }
    }
  );
});

app.post('/create-post', async (req, res) => {
  const data = req.body;

  try {
    const post = await Post.create({
      title: data.title,
      content: data.content,
      img: data.img,
      author: data.author,
      likes: 0,
      importance: data.importance,
    });
    res.send(JSON.stringify(post));
  } catch (e) {
    console.log(e.message);

    res.sendStatus(400);
  }
});

app.post('/fetch-posts', (req, res) => {
  Post.find(
    {
      author: mongoose.Types.ObjectId(req.body.id),
    },
    (err, posts) => {
      if (err) {
        console.log(err.message);
      } else {
        res.send(JSON.stringify(posts));
      }
    }
  );
});

app.delete('/delete-post', (req, res) => {
  Post.findByIdAndDelete(req.body.id, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('post deleted');
    }
  });
});

app.put('/like-post', async (req, res) => {
  const writeUserLikedBy = () => {
    return !req.body.liked
      ? { likes: req.body.likes, $push: { likedBy: req.body.authorId } }
      : { likes: req.body.likes, $pull: { likedBy: req.body.authorId } };
  };

  const post = await Post.findByIdAndUpdate(req.body.id, writeUserLikedBy());

  res.send(JSON.stringify(post.likedBy));
});

app.post('/post-likedby', (req, res) => {
  Post.findById({ _id: req.body.id }, function (err, post) {
    if (err) {
      console.log(err.message);
    } else {
      res.send(JSON.stringify(post.likedBy));
    }
  });
});

app.post('/get-users-byid', (req, res) => {
  

  User.find(
    {
      _id: { $in: req.body.ids.map((id) => mongoose.Types.ObjectId(id)) },
    },
    function (err, users) {
      if (err) {
        console.log(err)
      } else [
        res.send(JSON.stringify(users))
      ]
    }
  );
});

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
