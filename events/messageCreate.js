const { Events } = require('discord.js');
const { prefix } = require('../config.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        
        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();

        const command = message.client.commands.get(cmd) ||
            message.client.commands.find(a => a.aliases && a.aliases.includes(cmd));

        try {
            command.execute(message, args, cmd);
        } catch (error) {
            message.reply("There was an error trying to execute this command!");
            console.log(error);
        }
    }
}