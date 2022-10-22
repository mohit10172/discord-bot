const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with pong!'),
    async execute(interaction) {
        // await interaction.reply(`Websocket heartbeat: ${interaction.client.ws.ping}ms.`);
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        await interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms \nWebsocket heartbeat: ${interaction.client.ws.ping}ms.`);
    },
};
