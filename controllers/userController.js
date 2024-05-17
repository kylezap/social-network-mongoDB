const { Types } = require('mongoose');
const { User, Thought } = require('../models');



module.exports = {
 
  //USERS
 
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({user});
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      //Delete thoughts associated with this user as well

      // const thought = await Thought.findOneAndUpdate(
      //   { users: req.params.userId },
      //   { $pull: { users: req.params.userId } },
      //   { new: true }
      // );

      // if (!thought) {
      //   return res.status(404).json({
      //     message: 'User deleted',
      //   });
      // }

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // update a user
  async updateUser(req, res) {

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //REACTIONS

  // Add a reaction to a user
  async addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a user
  async removeReaction(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

//FRIENDS

//add a friend

async addFriend(req, res) {
  try {
      const newfriend = req.body; // Get the friend's user ID from the request parameters
      const friend = req.params.userId;
      console.log(friend);
      const user = await User.findOneAndUpdate(
          { _id: friend },
          { $addToSet: { friends: newfriend } }, // Add the friend's user ID to the friends array
          { new: true }
      );

      if (!user) {
          return res.status(404).json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
  } catch (err) {
      res.status(500).json(err);
  }
},

//remove a friend

async removeFriend(req, res) {
  try {
    const friendId = req.params.friendId; // Get the friend's user ID from the request parameters
      const userId = req.params.userId
      
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      {  new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},


}


