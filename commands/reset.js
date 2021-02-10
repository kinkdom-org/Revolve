module.exports = {
    name: 'reset',
    description: 'Reset a channel',
    execute(message, args) {
        
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;
        
        const embed = require('../modules/embed');

        reset_embed = embed.create(
            "Room reset", 
            `The previous roleplay is either finished, or has been inactive for some time. This post marks the beginning of a new one.

            First rp post after this gets to set the foundation. Should this be the previous occupants, they may continue their roleplay.`,
            3447003);
        
        message.channel.send(reset_embed);
        message.delete(); // Delete the user's message.

    }
};