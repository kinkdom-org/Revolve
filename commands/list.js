module.exports = {
    name: 'list',
    description: 'Lists the users who have a certain role.',
    execute(message, args) {
        
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;

        if (args.length > 0) {
            message.guild.members.fetch().then(fetchedMembers => {
                
                const hasRole = fetchedMembers.filter(member => member.roles.cache.some((role) => role.name === args[0]));
    
                message.channel.send(`Found \`${hasRole.size}\` matches!`);

                users = [];

                hasRole.forEach(user => {
                    users.push(`<@${user.user.id}>`);
                });

                if (users.length < 50) { // Mentions all users in chat if less than 50 
                    message.channel.send(users);
                }
                

            });
        }

        // message.channel.send();
        //message.delete(); // Delete the user's message.

    }
};