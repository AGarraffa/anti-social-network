const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    addThought,
    deleteThought,
    updateThought
} = require('../../controllers/thoughtController');

// api/thoughts/ end route

router.route('/')
    .get(getThoughts)
    .post(addThought)

router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)


module.exports = router;