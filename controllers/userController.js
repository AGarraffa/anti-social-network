// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id

// BONUS: Remove a user's associated thoughts when deleted.

// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list

const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

async function getUsers(req, res) {
    
    try {

        const userData = await User.find();
        return res.status(200).json(userData);

    } catch (err) {

        console.log(err);
        return res.status(500).json(err)

    }
};

async function getSingleUser(req, res) {

    try {
        
        const userData = await User.findOne({ _id: req.params.userId }).select('-__v');
    
        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID found' });
        }

        return res.status(200).json(userData);


    } catch (err) {

        console.log(err);
        return res.status(500).json(err);
    
    }
};

async function addUser(req, res) {

    try {

        const userData = await User.create(req.body)
        return res.status(200).json(userData);
    
    } catch (err) {

        console.log(err);
        return res.status(500).json(err);
    
    }

};

// TODO: write the put and delete route, as well as work on deleting thoughts when the user is deleted and then write post and delete to the friends list

