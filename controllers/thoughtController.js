const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// get all thoughts
async function getThoughts(req, res) {

    try {

        const thoughtData = await Thought.find();
        return res.status(200).json(thoughtData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
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

        console.log('Trying to create a thought')
        const thoughtData = await Thought.create(req.body)

        console.log('thought created')

        console.log(thoughtData._id)

        // updates the user with the thought
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thoughtData._id } },
            { new: true }
        )

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

        return res.status(200).json({ message: 'Thought deleted'});

        // 
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};


// updates a single thought
async function updateThought(req, res) {

    try {

        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { text: req.body.text },
            { new: true }
        ).select('-__v');


        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID found' });
        }

        return res.status(200).json(thoughtData);

        
    } catch (err) {
        console.log(err);
        return res.status(500).json(err)
    }
};

// add a reaction
async function addReaction(req, res) {

    try {

        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true } 
        ).select('-__v');

        if (!thoughtData) {
            return res.status(404).json({ message: 'No thought with that ID found' });
        }

        return res.status(200).json(thoughtData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

// delete a reaction
async function removeReaction(req, res) {

    try {

        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        ).select('-__v');

        if (!thoughtData) {
            return res.status(400).json({ message: 'No thought with that ID found'});
        }

        return res.status(200).json(thoughtData);

    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = { getThoughts, getSingleThought, addThought, deleteThought, updateThought, addReaction, removeReaction };