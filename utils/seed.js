const connection = require('../config/connection');
const { User, Thought } = require('../models');
const users = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // deletes the users and thoughts if they exist
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.collection.insertMany(users);

    console.table(users);
    console.info('Seeding Complete');
    process.exit(0);

});
