const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*\n\nReady! Logged in as ${client.user.tag}\n\n*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*`);
	},
};