
const { Client, GatewayIntentBits, Collection  } = require('discord.js');
const { Player } = require('discord-player');
const { token } = require('./config.json');
const eventHandler = require('./handlers/eventHandler');

//Create a Client instance.
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ], 
});

const player = new Player(client, {
    leaveOnEnd: true,
    leaveOnStop: true,
    leaveOnEmpty: true,
    leaveOnEmptyCooldown: 60000,
    autoSelfDeaf: true,
    initialVolume: 100 
});

//Dynamically loading the commmands and events from 'commands' & 'events' folders respectively.
client.commands = new Collection();
client.events = new Collection();

['commandHandler', 'eventHandler'].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

//Login using the bot token.
client.login(token);