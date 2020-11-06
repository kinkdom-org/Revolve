module.exports = {
    name: 'test',
    description: 'Just a test.',
    execute(message, args) {
        const fauna = require('../modules/fauna')

        const doc = fauna.test();
        message.channel.send(`response: ${doc}`);
    }
};