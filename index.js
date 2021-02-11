const fs = require('fs');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const TOKEN = process.env.TOKEN;    // Discord bot token
const PREFIX = '+';                 // Command prefix

// DISCORD
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();

// CUSTOM VARIABLES
const category_id = require('./variables/category_ids.json');
const channel_id = require('./variables/channel_ids.json');
const role_id = require('./variables/role_ids.json');

// CUSTOM MODULES
const embed = require('./modules/embed');
const introReport = require('./modules/intro_report');
const log = require('./modules/log');
const toggleRoles = require('./modules/toggle_roles.js');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const welcome_msgs = ["Welcome to Kinkdom", "Welcome aboard", "Hello, and welcome", "Welcome to the Kinkdom Empire", "Greetings", "Welcome to the server"];
const community_rooms = [category_id.community_rooms_1, category_id.community_rooms_2, category_id.community_rooms_3]

client.once('ready', () => {
    console.log('Ready!\n');
    client.user.setActivity('Loyal Kinkdom Guardian');
});

client.on('guildMemberAdd', member => {

    const log_channel = member.guild.channels.cache.get(channel_id.log_channel);
    log_channel.send(embed.join(member));

    if (!member.roles.cache.has(role_id.uncharted)) {
        member.roles.add(role_id.uncharted);
    }

    const welcome_chat = member.guild.channels.cache.get(channel_id.welcome_chat);
    const welcome_channel = member.guild.channels.cache.get(channel_id.welcome).toString();

    const random = Math.floor(Math.random() * welcome_msgs.length);

    welcome_chat.send(`:ballot_box_with_check:  ${welcome_msgs[random]}, ${member}! To get started, please follow the steps in ${welcome_channel}. If you need help, feel free to ask in chat or contact a staff member!`);

});

client.on('guildMemberRemove', member => {

    const log_channel = member.guild.channels.cache.get(channel_id.log_channel);
    log_channel.send(embed.leave(member));

});

client.on('message', message => {
    
    log.post(message);
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) msgCommand(message);
    if (message.channel.id === channel_id.assign_roles) toggleRoles.run(message);
    if (message.channel.id === channel_id.introductions && message.member.roles.cache.has(role_id.uncharted)) {
        let response = introReport.start(message);
        if (!response) return;
        message.channel.send(response)
        .then(post => {
            post.delete({timeout: 600_000});
        }).catch();
    }
    if (community_rooms.includes(message.channel.parent.id)) logMessage(message);
});

function msgCommand(message) {

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
        message.reply('there was an error trying to execute that command.\n\n```' + error + '```')
        .then(msg => {
            msg.delete({timeout:60000}) // Delete reply after 10 seconds.
        })
        .catch();
	}
};

function logMessage(message) {
    console.log("Message in category found!");
}

client.login(TOKEN);

