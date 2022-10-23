const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection  } = require('discord.js');
const { token } = require('./config.json');
const eventHandler = require('./handlers/eventHandler');

//Create a Client instance.
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
    ], 
});

//Dynamically loading the commmands and events from 'commands' & 'events' folders respectively.
client.commands = new Collection();
client.events = new Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Login using the bot token.
client.login(token);