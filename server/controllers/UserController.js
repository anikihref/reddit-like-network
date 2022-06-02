const User = require('../model/User.js');
const { default: mongoose } = require('mongoose');


const UserController = class {
  async create(req, res) {
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
        posts: []
      });
  
      res.send(JSON.stringify(user));
    } catch (err) {
      console.log('create user error', err.message);
  
      res.send(err.message);
      res.status(400);
    }
  }

  async getUserByPassword (req, res) {
    const data = req.body;
  
    User.findOne(
      { username: data.username, password: data.password },
      function (err, user) {
        if (err) {
          console.log(err.message);
        } else {
          res.json(user);
        }
      }
    );
  }

  getAll(req, res) {
    User.find(
      {
        _id: { $in: req.body.ids.map((id) => mongoose.Types.ObjectId(id)) },
      },
      function (err, users) {
        if (err) {
          console.log(err)
        } else {
          res.json(users)
        }
      }
    );
  }
}

module.exports = new UserController