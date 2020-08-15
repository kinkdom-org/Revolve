const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!\n');
});

client.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.get(config.welcome_chat_id);
    const welcome_channel = member.guild.channels.cache.get(config.welcome_id).toString();
    channel.send(`:ballot_box_with_check:  Welcome to Kinkdom, ${member}! To get started, please follow the steps in ${welcome_channel}. If you need help, feel free to ask in chat or contact a staff member!`);

});

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.startsWith(config.prefix)) msgCommand(message);
    if (message.channel.id === config.assign_roles_id) msgToggleRoles(message);

});

function msgCommand(message) {

	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command.');
	}
};

function msgToggleRoles(message) {

    const role = message.content.toLowerCase();
    let role_id = "";
    
    if      (role === "events" || role === "event")     role_id = config.events_id;
    else if (role === "dom")                            role_id = config.dom_id;
    else if (role === "sub")                            role_id = config.sub_id;
    else if (role === "switch")                         role_id = config.switch_id;
    else if (role === "f" || role === "fandom")         role_id = config.F_id;
    else if (role === "d" || role === "dark")           role_id = config.D_id;
    else if (role === "nh" || role === "non humanoid")  role_id = config.NH_id;
    else if (role === "k" || role === "kink")           role_id = config.K_id;
    else if (role === "p" || role === "porn")           role_id = config.P_id;
    else {
        message.reply('please enter one of the assignable roles mentioned in the post above.')
        .then(msg => {
            msg.delete({timeout:10000}) // Delete reply after 10 seconds.
        })
        .catch();
        message.delete(); // Delete the user's message.
        return;
    }

    if (message.member.roles.cache.has(role_id)) {
        message.member.roles.remove(role_id);
    }
    else {
        message.member.roles.add(role_id);
    }

    message.delete(); // Delete the user's message.

};

client.login(config.token);