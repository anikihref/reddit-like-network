const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./model/User.js');
const Post = require('./model/Post.js');
const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')

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


app.get('/connect', async (req, res) => {
  try {
    await mongoose.connect(CONNECT_URI);

    console.log('connected');
    res.sendStatus(200);
  } catch (err) {
    res.send(err.message);
  }
});

app.post('/user-by-password', UserController.getUserByPassword);
app.post('/user', UserController.create);
app.post('/users', UserController.getAll);



app.post('/post', PostController.create);
app.get('/post/author/:id', PostController.getByAuthorId);
app.delete('/post', PostController.delete);
app.put('/post-like', PostController.likePost);
app.get('/post-likes/:id', PostController.postLikes);


app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
