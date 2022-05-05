const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // deletes the users and thoughts if they exist
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.collection.insertMany(data);

    console.table(data);
    console.info('Seeding Complete');
    process.exit(0);

});

const data = [
    {
        userName: 'Test 1',
        email: 'test1@test.com',
        thoughts: [],
        friends: [],
    },
    {
        userName: 'Test 2',
        email: 'test2@test.com',
        thoughts: [],
        friends: [],
    },
    {
        userName: 'Test 3',
        email: 'test3@test.com',
        thoughts: [],
        friends: [],
    },
    {
        userName: 'Test 3',
        email: 'test3@test.com',
        thoughts: [],
        friends: [],
    },
    {
        userName: 'Test 4',
        email: 'test4@test.com',
        thoughts: [],
        friends: [],
    },
];