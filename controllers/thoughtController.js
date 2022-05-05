// /api/thoughts

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// PUT to update a thought by its _id

// DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value

const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// get all thoughts
async function getThoughts(req, res) {
    
    try {

        const thoughtData = await Thought.find();
        return res.status(200).json(thoughtData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};


// finds a single thought
async function getSingleThought(req, res) {

    try {
        
        const thoughtData = await Thought.findById(req.params.thoughtId).select('-__v');
    
        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID found' });
        }

        return res.status(200).json(thoughtData);


    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


// adds a thought
async function addThought(req, res) {

    try {

        const thoughtData = await Thought.create(req.body)
        return res.status(200).json(thoughtData);
    
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }

};

// deletes a thought
async function deleteThought(req, res) {

    try {

        const thoughtId = await Thought.findById(req.params.thoughtId);

        const thoughtData = await Thought.findByIdAndDelete(req.params.thoughtId).select('-__v');

        if (!thoughtData) {
            return res.status(404).json({message: 'No user with that ID found'});
        }

        // const userData = await cascadeUser(req, res, thoughtId._id);

        return res.status(200).json(thoughtData);

        // 
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


// used for deleting thoughts of a removed user
// async function cascadeUser(req, res, id) {

//     try {

//         const userData = await User.findOneAndUpdate({userId: req.params.userId}).select('-__v');

//         return res.status(200).json(userData);

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// };


// updates a single thought
async function updateThought(req, res) {

    try {

        const thoughtData = await User.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { text: req.body.text }
        ).select('-__v');


        if (!thoughtData) {
            return res.status(404).json({ message: 'No user with that ID found' });
        }

        return res.status(200).json(thoughtData);

        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};

// make this a reaction function
// async function addFriend(req, res) {

//     try {

//         const userData = await User.findById(req.params.userId).select('-__v');;

//         if (!userData) {
//             return res.status(404).json({ message: 'No user with that ID found'});
//         }

//         let friendArr = userData.friends;

//         friendArr.push(req.params.friendId);

//         const updatedUserData = await User.findOneAndUpdate(
//             {_id: req.params.userId},
//             { friends: friendArr}
//             ).select('-__v');

//         return res.status(200).json(updatedUserData);

//     } catch (err) {
//         console.log(err);
//         return res.status(500).json(err);
//     }
// }

module.exports = { getThoughts, getSingleThought, addThought, deleteThought, updateThought };