module.exports = {
    name: 'post',
    description: 'Post message in channel.',
    execute(message, args) {
        
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;

        let post = args.join(' ');

        message.channel.send(post);
        message.delete(); // Delete the user's message.

    }
};