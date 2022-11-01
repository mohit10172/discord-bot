const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    
    const eventFiles = fs.readdirSync('./events/').filter(file => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`../events/${file}`);
        console.log(`[INFO]: Loading ${eventFiles.length} events...`);

        let type = "client";
        if (file.includes("player.")) type = "player";

        if (type === "player") {
            client.player.on(event.name, event.execute.bind(null, client));
        } else if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }   

        delete require.cache[require.resolve(`../events/${file}`)]

        console.log(`[DEBUG]: Loaded ${event.name}.js`);
    }
};