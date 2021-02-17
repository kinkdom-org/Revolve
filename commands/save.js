module.exports = {
    name: 'save',
    description: 'Saves the roleplay into a file. Command must be made in a channel that is in a roleplay category.',
    execute(message, args) {
        
        // TODO: Check if message is in a roleplay channel.

        // For now, only staff members can use this command.
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;

        fs = require('fs');

        message.channel.messages.fetch({ limit: 100 }).then(fetchedMessages => {

            let string = "";

            let messages = [];

            fetchedMessages.forEach(message => {
                messages.push(message);
            });

            messages = messages.reverse();

            messages.forEach(message => {
                string += message.author.username + " - " + message.createdAt + ":\n\n";
                string += message.content + "\n\n";
                string += "--------------------\n\n"
            });

            const file = "./backup_files/" + message.channel + ".txt";

            fs.writeFile(file, string, function(err, result) {
                if(err) console.log('error', err);
            });

            message.channel.send("Here's a file containing the 100 last messages in this channel.", { files: [file] })

        });

    }
};