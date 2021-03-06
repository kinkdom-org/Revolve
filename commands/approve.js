module.exports = {
    name: 'approve',
    description: 'Used by staff to approve Uncharted users.',
    execute(message, args) {

        const channel_id = require('../variables/channel_ids.json');

        if (message.channel.id !== channel_id.welcome_chat) return;
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;
        //if (!message.member.roles.has(id.staff)) return;

        let mention = message.mentions.users.first();

        if (mention) {

            const welcome_chat_channel = message.guild.channels.cache.get(channel_id.welcome_chat);
            const operator_logs_channel = message.guild.channels.cache.get(channel_id.operator_logs);

            welcome_chat_channel.send(`:white_check_mark:  Your intro has been approved, ${mention}! You can now assign yourself access to additional channels in <#${channel_id.assign_roles}> by following the instructions. To start looking for RP partners, visit one of our partner search channels <#${channel_id.partner_searches}>. If you have any questions on how to get started, ask one of our lovely 'Admins,' 'Moderators,' or 'Operators' in the member list!`);
            operator_logs_channel.send(`:pencil:  ${message.author.username} approved user ${mention}`)
            .then(msg => {
                msg.edit(`:pencil:  <@${message.member.id}> approved user ${mention}`)
            });
            //operator_logs_channel.send(`:pencil:  <@${message.author.username}> approved user ${mention}`);

        }
        else {
            message.reply("Could not find a mentioned user. Please try again!")
            .then(msg => {
                msg.delete({timeout:10000}) // Delete reply after 10 seconds.
            })
            .catch();
        }

        message.delete(); // Delete the user's message.

    }
};