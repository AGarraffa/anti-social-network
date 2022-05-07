const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    addThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

// api/thoughts/ end route

router.route('/')
    .get(getThoughts)
    .post(addThought)

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);


module.exports = router;