module.exports = {

    create(title, description, color, image = null) {

        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setColor(color);
            //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        
        if (image) embed.setThumbnail(image);

        return(embed);

    },

    join(member) {

        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
            .setTitle('User joined!')
            .setDescription(`<@${member.id}> has joined the server!`)
            .setColor('#69FF4F')
            .setThumbnail(member.user.avatarURL())
            .setFooter(`${member.displayName} - ${member.id}`);

        return(embed);

    },

    leave(member) {

        const Discord = require('discord.js');

        const embed = new Discord.MessageEmbed()
            .setTitle('User left...')
            .setDescription(`<@${member.id}> has left the server.`)
            .setColor('#5BAAFF')
            .setThumbnail(member.user.avatarURL())
            .setFooter(`${member.displayName} - ${member.id}`);

        return(embed);

    }

};