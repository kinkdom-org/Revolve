module.exports = {

    run(message) {

        const role_id = require('../variables/role_ids.json');

        const role_str = message.content.toLowerCase();
        let role = "";
        
        if      (role_str === "events" || role_str === "event")     role = role_id.events;
        else if (role_str === "dom")                                role = role_id.dom;
        else if (role_str === "sub")                                role = role_id.sub;
        else if (role_str === "switch")                             role = role_id.switch;
        else if (role_str === "f" || role_str === "fandom")         role = role_id.F;
        else if (role_str === "d" || role_str === "dark")           role = role_id.D;
        else if (role_str === "nh" || role_str === "non-humanoid")  role = role_id.NH;
        else if (role_str === "k" || role_str === "kink")           role = role_id.K;
        else if (role_str === "p" || role_str === "porn")           role = role_id.P;
        else {
            message.reply('please enter one of the assignable roles mentioned in the post above.')
            .then(msg => {
                msg.delete({timeout:10000}) // Delete reply after 10 seconds.
            })
            .catch();
            message.delete(); // Delete the user's message.
            return;
        }
    
        if (message.member.roles.cache.has(role)) {
            message.member.roles.remove(role);
        }
        else {
            message.member.roles.add(role);
        }
    
        message.delete(); // Delete the user's message.
    
    }

}