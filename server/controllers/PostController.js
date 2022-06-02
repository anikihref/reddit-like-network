const Post = require('../model/Post.js');
const { default: mongoose } = require('mongoose');

const PostController = class {
  async delete(req, res) {
    Post.findByIdAndDelete(req.body.id, function (err) {
      if (err) {
        console.log(err.message);
      } else {

        if (!req.body.id) {
          res.status(400).send('ID не вказаний')
        } else {
          res.sendStatus(200)
        }
      }
    });
  }

  async create(req, res) {
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
      res.json(post);
    } catch (e) {
      console.log(e.message);
  
      res.sendStatus(400);
    }
  }

  async getByAuthorId(req, res) {
    Post.find(
      {
        author: mongoose.Types.ObjectId(req.params.id),
      },
      (err, posts) => {
        if (err) {
          console.log(err.message);
        } else {
          res.json(posts);
        }
      }
    );
  }

  async likePost(req, res) {
    const writeUserLikedBy = () => {
      return !req.body.liked
        ? { likes: req.body.likes, $push: { likedBy: req.body.authorId } }
        : { likes: req.body.likes, $pull: { likedBy: req.body.authorId } };
    };
  
    const post = await Post.findByIdAndUpdate(req.body.id, writeUserLikedBy());
  
    res.json(post.likedBy);
  }

  async postLikes(req, res) {
    Post.findById({ _id: req.params.id }, function (err, post) {
      if (err) {
        console.log(err.message);
      } else {
        res.json(post.likedBy);
      }
    });
  }
}

module.exports = new PostController