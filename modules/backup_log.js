module.exports = {

    run(message) {

        // IGNORE OOC AND SINGLE MENTIONS (bots are already ignored. See index.js)
        if (message.content.startsWith('(') || message.content.startsWith('/') || message.content.startsWith('+')) return;
        if (!message.content) return; // Ignore pins
        // TODO: Ignore single mentions. Do not use .startsWith('<'), because -> '<:LineBreak:...'

        fs = require('fs');

        const backup_log_channel = message.member.guild.channels.cache.get('811717507689873438');

        const file = "./backup_files/" + message.channel.id + ".txt"

        
        // APPEND POST TO FILE

        const data = `${message.author.username} - ${message.createdAt}:\n\n${message.content}\n\n--------------------\n\n`

        fs.appendFile(file, data, function (err) {
            if (err) throw err;
          });

        // EDIT POST IN BACKUP LOG CHANNEL WITH UPDATED FILE

        // Get the ID of the message in backup_log containing the correct file.
        function getMessageID(backup_messages) {

            let backup_message_id = '';

            backup_messages.forEach(backup_message => {

                if (backup_message.content.includes(message.channel.id)) {
                    backup_message_id = backup_message.id;
                }

            });

            return backup_message_id;

        }

        function deleteMessage(backup_message_id) {

            console.log('backup_message_id: ' + backup_message_id);

            backup_log_channel.messages.fetch({ around: backup_message_id, limit: 1 }).then(fetched_message => {

                const post = fetched_message.first();

                console.log('removing post: ' + post);

                post.delete();

            });

        }

        function postMessage(message, file) {

            backup_log_channel.send(
                `:notebook_with_decorative_cover:  <#${message.channel.id}> - ID: \`${message.channel.id}\`\nLast post by ${message.author.name}`,
                { files: [file] }
            ).then(msg => {
                msg.edit(`:notebook_with_decorative_cover:  <#${message.channel.id}> - ID: \`${message.channel.id}\`\nLast post by <@!${message.author.id}>`)
            });

        }

        backup_log_channel.messages.fetch({ limit: 100 }).then(fetched_messages => {

            const backup_messages = [];

            backup_messages.push(...fetched_messages.array());

            backup_message_id = getMessageID(backup_messages);

            if (backup_message_id)  deleteMessage(backup_message_id);
            
            postMessage(message, file);

        });

    }

}


