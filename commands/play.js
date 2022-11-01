const { SlashCommandBuilder, ReactionUserManager } = require('discord.js');
const { Player } = require('discord-player');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Plays the song!')
        .addStringOption(option =>
            option.setName('song')
                .setDescription('The song name/url, to be played.')
                .setRequired(true)),
    
    async execute(interaction) {

        const player = new Player(interaction.client);
        try {
            const string = await interaction.options.getString('song', true);
            const guildQueue = player.getQueue(interaction.guild.id);
            const channel = interaction.member?.voice?.channel;

            if (!channel)
                return interaction.reply("You have to join a voice channel first.");

            if (guildQueue) {
                if (channel.id !== interaction.guild.me?.voice?.channelId)
                    return interaction.reply("I'm already playing in a different voice channel!");
            } else {
                if (!channel.viewable)
                    return interaction.reply("I need **\`VIEW_CHANNEL\`** permission.");
                if (!channel.joinable)
                        return interaction.reply("I need **\`CONNECT_CHANNEL\`** permission.");
                if (!channel.speakable)
                        return interaction.reply("I need **\`SPEAK\`** permission.");
                if (channel.full)
                    return interaction.reply("Can't join, the voice channel is full.");
            }

            let result = await player.search(string, { requestedBy: interaction.user }).catch(() => { });
            if (!result || !result.tracks.length)
                return interaction.client.say.errorMessage(`No result was found for \`${string}\`.`);

            let queue;
            if (guildQueue) {
                queue = guildQueue;
                queue.metadata = interaction;
            } else {
                queue = await player.createQueue(interaction.guild, {
                    metadata: interaction
                });
            }

            try {
                if (!queue.connection) await queue.connect(channel);
            } catch (error) {
                console.error(error)
                player.deleteQueue(interaction.guild.id);
                return interaction.client.say.errorMessage(`Could not join your voice channel!\n\`${error}\``);
            }

            result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0]);

            if (!queue.playing) await queue.play();
        } catch (e) {
            console.log(e);
        }
    },
};