module.exports = {

    create(title, description, color, image = null) {

        const Discord = require('discord.js');

        if (image) {
            return(
                new Discord.MessageEmbed()
                    .setTitle(title)
                    .setDescription(description)
                    .setColor(color)
                    .setThumbnail(image)
                    //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
            );
        }

        return(
            new Discord.MessageEmbed()
                .setTitle(title)
                .setDescription(description)
                .setColor(color)
                //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        );

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