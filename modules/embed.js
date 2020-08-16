module.exports = {

    create(title, description, image, color) {

        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setThumbnail(image)
        .setColor(color);
        //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        return(embed);

    },

    join(member) {

        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
        .setTitle('User joined!')
        .setDescription(`<@${member.id}> has joined the server!`)
        .setThumbnail(member.user.avatarURL())
        .setColor('#69FF4F')
        .setFooter(`${member.displayName} - ${member.id}`);

        return(embed);

    },

    leave(member) {

        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
        .setTitle('User left...')
        .setDescription(`<@${member.id}> has left the server.`)
        .setThumbnail(member.user.avatarURL())
        .setColor('#5BAAFF')
        .setFooter(`${member.displayName} - ${member.id}`);

        return(embed);

    }

};