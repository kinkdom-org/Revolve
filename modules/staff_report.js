module.exports = {

    post(topic, message, detail) {

        

        const { staff_report } = require('../variables/channel_ids.json');

        const staff_report_channel = message.member.guild.channels.cache.get(staff_report);
        const post = this.getCaseString(topic, message, detail);
        
        staff_report_channel.send(post);

    },

    getCaseString(topic, message, detail) {

        switch (topic) {
            case "underage":
                return `:rotating_light: | User ${message.author.username} provided \`${detail}\` in their intro. <@&630999522293841941>`;
        
            default:
                break;
        }

    }

}