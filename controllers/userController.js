const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// gets all users
async function getUsers(req, res) {
    
    try {

        const userData = await User.find();
        return res.status(200).json(userData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};


// finds a single user
async function getSingleUser(req, res) {

    try {
        
        const userData = await User.findById(req.params.userId).select('-__v');
    
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

// TODO: write the put and delete route, as well as work on deleting thoughts when the user is deleted and then write post and delete to the friends list

// deletes a user
async function deleteUser(req, res) {

    try {

        const userData = await User.findByIdAndDelete(req.params.userId).select('-__v');

        if (!userData) {
            return res.status(404).json({message: 'No user with that ID found'});
        }

        const thoughtData = await cascadeThought(req, res);

        return res.status(200).json(userData);

        // 
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


// used for deleting thoughts of a removed user
async function cascadeThought(req, res) {

    try {

        const thoughtData = await Thought.deleteMany({userId: req.params.userId}).select('-__v');

        return res.status(200).json(thoughtData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


// updates a single user
async function updateUser(req, res) {

    let update = {};

    // logic to only update the fields that are provided
    if (req.body.userName) {
        update.userName = req.body.userName;
    };

    if (req.body.email) {
        update.email = req.body.email;
    };

    try {

        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { update }
        ).select('-__v');


        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID found' });
        }

        return res.status(200).json(userData);

        // just messing around with ternary operators
        // !userData ? res.status(404).json({message: 'No user with that ID found'}) : res.status(200).json(userData);
        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};


async function addFriend(req, res) {

    try {

        const userData = await User.findById(req.params.userId).select('-__v');;

        if (!userData) {
            return res.status(404).json({ message: 'No user with that ID found'});
        }

        let friendArr = userData.friends;

        friendArr.push(req.params.friendId);

        const updatedUserData = await User.findOneAndUpdate(
            {_id: req.params.userId},
            { friends: friendArr}
            ).select('-__v');

        return res.status(200).json(updatedUserData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = { getUsers, getSingleUser, addUser, deleteUser, updateUser, addFriend };