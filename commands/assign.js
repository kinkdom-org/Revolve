module.exports = {
    name: 'assign',
    description: 'Assigns a role to all users who have a certain role.',
    execute(message, args) {
        
        if (!message.member.roles.cache.some((role) => role.name === 'Admin')) return;

        if (args.length === 2) {
            message.guild.members.fetch().then(fetchedMembers => {
                
                const hasRole = fetchedMembers.filter(member => member.roles.cache.some((role) => role.name === args[1]));

                const role = message.guild.roles.cache.find(role => role.name == args[0])

                hasRole.forEach(user => {
                    user.roles.add(role);
                    //console.log(user._roles);
                });

                message.channel.send(`The ${args[0]} role has been assigned to ${hasRole.size} users with the ${args[1]} role.`);
                
            });
        }
        else {
            message.channel.send("The `+assign` commands needs two arguments.");
        }

    }
};