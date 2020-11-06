module.exports = {
    name: 'approve',
    description: 'Used by staff to approve Uncharted users.',
    execute(message, args) {

        const id = require('../variables/ids.json');

        if (message.channel.id !== id.welcome_chat) return;
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;
        //if (!message.member.roles.has(id.staff)) return;

        console.log('Got here 3');

        let mention = message.mentions.users.first();

        console.log(mention);

        if (mention) {

            const welcome_chat_channel = message.guild.channels.cache.get(id.welcome_chat);
            const operator_logs_channel = message.guild.channels.cache.get(id.operator_logs);

            welcome_chat_channel.send(`:white_check_mark:  Your intro has been approved, ${mention}! You can now assign yourself access to additional channels in <#${id.assign_roles}> by following the instructions. To start looking for RP partners, visit one of our partner search channels <#${id.partner_searches}>. If you have any questions on how to get started, ask one of our lovely 'Admins,' 'Moderators,' or 'Operators' in the member list!`);
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