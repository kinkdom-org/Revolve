module.exports = {

    post(message) {

        const reset_color = '\x1b[0m'; // Reset color
        const detail_color = '\x1b[97m'; // Bright White

        const separation_color = '\x1b[30m'; // Bright Black

        const date_color = '\x1b[93m'; // Bright Yellow
        const user_color = (message.author.bot) ? '\x1b[95m' : '\x1b[92m'; // User: Bright Green, Bot: Bright Magenta
        const channel_color = '\x1b[94m'; // Bright Blue
        const content_color = '\x1b[37m'; // White

        const ts = new Date();

        console.log(`${separation_color} -------------------------------------------------- ${ts.toLocaleString()}${reset_color}`);
        //console.log(`${date_color}${ts.toLocaleString()}${detail_color} ] By ${user_color}${message.author.username} ${detail_color}in ${channel_color}${message.channel.name}${reset_color}`);
        console.log(`By ${user_color}${message.author.username} ${detail_color}in ${channel_color}${message.channel.name}${reset_color}`);
        console.log();
        console.log(`${content_color}${message.content}${reset_color}`);
        console.log();

    }

}




/* 1603219502908
Colors reference

Reset = "\x1b[0m"
Bright = "\x1b[1m"
Dim = "\x1b[2m"
Underscore = "\x1b[4m"
Blink = "\x1b[5m"
Reverse = "\x1b[7m"
Hidden = "\x1b[8m"

FgBlack = "\x1b[30m"
FgRed = "\x1b[31m"
FgGreen = "\x1b[32m"
FgYellow = "\x1b[33m"
FgBlue = "\x1b[34m"
FgMagenta = "\x1b[35m"
FgCyan = "\x1b[36m"
FgWhite = "\x1b[37m"

BgBlack = "\x1b[40m"
BgRed = "\x1b[41m"
BgGreen = "\x1b[42m"
BgYellow = "\x1b[43m"
BgBlue = "\x1b[44m"
BgMagenta = "\x1b[45m"
BgCyan = "\x1b[46m"
BgWhite = "\x1b[47m"
*/