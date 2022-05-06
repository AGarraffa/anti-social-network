const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// gets all users
async function getUsers(req, res) {
    
    try {

        const userData = await User.find()
        .populate('thoughts')
        .populate('friends');
        return res.status(200).json(userData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};


// finds a single user
async function getSingleUser(req, res) {

    try {
        
        const userData = await User.findById(req.params.userId)
        .select('-__v')
        .populate('thoughts')
        .populate('friends');
    
        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID found' });
        }

        return res.status(200).json(userData);


    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


// adds a user
async function addUser(req, res) {

    try {

        const userData = await User.create(req.body)
        return res.status(200).json(userData);
    
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }

};

// deletes a user
async function deleteUser(req, res) {

    try {

        const userData = await User.findByIdAndDelete(req.params.userId).select('-__v');

        if (!userData) {
            return res.status(404).json({message: 'No user with that ID found'});
        }

        // const thoughtData = await cascadeThought(req, res);
        const thoughtData = await Thought.deleteMany({userId: req.params.userId}).select('-__v');

        return res.status(200).json({ message: 'User has been deleted' });

        // 
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// updates a single user
async function updateUser(req, res) {

    try {

        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { userName: req.body.userName, email: req.body.email }
        ).select('-__v');


        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID found' });
        }

        return res.status(200).json(userData);
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};

// needs work
async function addFriend(req, res) {

    try {

        const userData = await User.findById(req.params.userId).select('-__v');;

        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID found'});
        }

        const updatedUserData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            { friends: req.params.friendId},
            { new: true }
            ).select('-__v');

        return res.status(200).json(updatedUserData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = { getUsers, getSingleUser, addUser, deleteUser, updateUser, addFriend };