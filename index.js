const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

//Create a Client instance.
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
    ], 
});


//Get the path and files related to events.
const eventsPath = path.join(__dirname, 'event');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        console.on(event.name, (...args) => event.execute(...args));
    }
}

//Login  using the bot token.
client.login(token);