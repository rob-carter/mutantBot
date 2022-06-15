const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueueRepeatMode } = require('discord-player');
//const { autoplay } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autoplay')
		.setDescription('Autoplay content.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('recommended')
                .setDescription('Autoplay recommended content (based on last song in queue).')
                        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('playlist')
                .setDescription('Autoplay a given playlist.')
                .addStringOption((option) => 
                option
                    .setName('url')
                    .setDescription(`Playlist URL.`)
                    .setRequired(true)
                    )),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'Nothing is playing.', ephemeral: true})
        } else {
            if (interaction.options.getSubcommand() === 'recommended') {
                queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                interaction.reply({content: 'Autoplaying recommended.'})
            } else if (interaction.options.getSubcommand() === 'playlist') { //TODO:
                const url = interaction.options.getSubcommand() === 'url'
                interaction.reply({content: 'Not imp yet...'})
            }
        }
    },
};