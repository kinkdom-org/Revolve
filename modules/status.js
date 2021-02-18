module.exports = {

    async buildStatus(message) {

        const fs = require('fs');
        // Make 'files/status.json'

        async function getData() {
            return fs.readFileSync('./variables/public_rooms.json');
        }

        const data = await getData();

        const rooms_json = JSON.parse(data);
        console.log(rooms_json);

        const categories = rooms_json.includedCategories;

        console.log('categories: ' + categories);

        let channels = []

        categories.forEach(category_id => {
            console.log('category_id: ' + category_id);

            const category = message.guild.channels.cache.get(category_id); // this gives undefined
            console.log('category: ' + category);
 
            console.log('category.children: ' + category.children);
            channels.push(category.children);
        });
        
        console.log('channels: ' + channels);

        return rooms_json.includedCategories[0];

        


        // Make status post

    },

    edit() {

        

    }

};