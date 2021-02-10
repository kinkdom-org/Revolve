module.exports = {
    name: 'patreon',
    description: 'Used by Patrons to claim rewards.',
    execute(message, args) {

        const channel_id = require('../variables/channel_ids.json');

        if (message.channel.id !== channel_id.patron_chat) return;

        if (args.length < 2) {
            message.reply("the Patreon commands should look something like this:\n\n`+patreon credit <name>`\n`+patreon headpats <staff-username>`\n\n")
            .then(msg => {
                msg.delete({timeout:10000}) // Delete reply after 10 seconds.
            })
            .catch();
            message.delete(); // Delete the user's message.
            return;
        }
        else if (args[0].toLowerCase() === 'credit') {
            const channel = message.guild.channels.cache.get(channel_id.staff_highlights);
            channel.send(`🔸 <@${message.member.id}> used the \`+patreon credit\` command!\n\nName to be used for website credits page: ${args.slice(1).join(' ')}\n<@279395206024003587>`);
        }
        else if (args[0].toLowerCase() === 'headpats') {
            const channel = message.guild.channels.cache.get(channel_id.operator_highlights);
            channel.send(`🔹 <@${message.member.id}> used the \`+patreon headpats\` command!\n\nStaff member to give headpats: ${args.slice(1).join(' ')}\n*Please react to this post if your name appeared and you have sent the user headpats.*`);
        }
        else {
            message.reply("Something went wrong! Please try again.")
            .then(msg => {
                msg.delete({timeout:10000}) // Delete reply after 10 seconds.
            })
            .catch();
            message.delete(); // Delete the user's message.
            return;
        }

        method_attribute = ['flying', 'jumping', 'skilled', 'rolling', 'specialized', 'climbing', 'secret', 'highly educated', 'tiny'];
        method_object = ['pidgeons', 'polar bears', 'kittens', 'penguins', 'sharks', 'trucks', 'turtles', 'pandas', 'nuggets', 'monkeys'];

        const random_1 = Math.floor(Math.random() * method_attribute.length);
        const random_2 = Math.floor(Math.random() * method_object.length);

        message.reply("thanks for the info! I've sent it safely to the Kinkdom staff using a team of " + method_attribute[random_1] + " delivery " + method_object[random_2] + ".");
        message.delete(); // Delete the user's message.

    }
};