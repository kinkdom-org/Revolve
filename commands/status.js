module.exports = {
    name: 'status',
    description: 'Post status of rp channels in channel.',
    execute(message, args) {
        
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;
        if (message.channel.id !== '811931714804383764') return; // Must be status channel

        const status = require('../modules/status');

        status.buildStatus(message).then(status_post => {
            console.log('status_post: ' + status_post);
            message.channel.send(status_post);
        });

        message.delete(); // Delete the user's message.

    }
};