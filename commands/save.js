module.exports = {
    name: 'save',
    description: 'Saves the roleplay into a file. Command must be made in a channel that is in a roleplay category.',
    execute(message, args) {
        
        // TODO: Check if message is in a roleplay channel.

        // For now, only staff members can use this command.
        if (!message.member.roles.cache.some((role) => role.name === 'Staff')) return;

        fs = require('fs');

        async function fetchMessages(channel, limit = 500) {

            const sum_messages = [];
            let last_id;
        
            while (true) {
                const options = { limit: 100 };
                if (last_id) {
                    options.before = last_id;
                }
        
                const messages = await channel.messages.fetch(options);
                sum_messages.push(...messages.array());
                last_id = messages.last().id;
        
                if (messages.size != 100 || sum_messages >= limit) {
                    break;
                }
            }
        
            return sum_messages;
        }

        message.channel.send('loading... please wait!');

        fetchMessages(message.channel).then(messages => {
            
            messages = messages.reverse();

            let string = "";
            let counter = 0;

            messages.forEach(message => {
                if (!message.author.bot && !message.content.startsWith('(') && !message.content.startsWith('/') && !message.content.startsWith('+') && message.content) {
                    string += message.author.username + " - " + message.createdAt + ":\n\n";
                    string += message.content + "\n\n";
                    string += "--------------------\n\n"
                    counter += 1;
                }
            });

            const file = "./backup_files/" + message.channel.id + ".txt";

            fs.writeFile(file, string, function(err, result) {
                if(err) console.log('error', err);
            });

            message.channel.send(`Here's a file containing ${counter} posts of interest in this channel.`, { files: [file] });

        })


        // message.channel.messages.fetch({ limit: 100 }).then(fetchedMessages => {

        //     let messages = [];

        //     fetchedMessages.forEach(message => {
        //         messages.push(message);
        //     });

        //     messages = messages.reverse();

        //     let string = "";

        //     messages.forEach(message => {
        //         string += message.author.username + " - " + message.createdAt + ":\n\n";
        //         string += message.content + "\n\n";
        //         string += "--------------------\n\n"
        //     });

        //     const file = "./backup_files/" + message.channel.id + ".txt";

        //     fs.writeFile(file, string, function(err, result) {
        //         if(err) console.log('error', err);
        //     });

        //     message.channel.send("Here's a file containing the 100 last messages in this channel.", { files: [file] })

        // });

    }
};