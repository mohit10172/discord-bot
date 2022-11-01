const fs = require('fs');

module.exports = (client) => {
	const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
	console.log(`[INFO]: Loading ${commandFiles.length} commands... (This may take a while)`);

	for (const file of commandFiles) {
		const command = require(`../commands/${file}`);
		const filePath = `../commands/${file}`;

		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
	console.log(`[INFO]: Loaded ${commandFiles.length} files successfully!`);	
};