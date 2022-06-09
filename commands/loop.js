const { SlashCommandBuilder } = require('@discordjs/builders');
const { QueueRepeatMode } = require('discord-player');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('Loop content.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('current')
                .setDescription('Loop current song.')
                        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('queue')
                .setDescription('Loop queue.')
                        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('stop')
                .setDescription('Stops loop.')
                        ),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'Nothing is playing.', ephemeral: true})
        } else {
            if (interaction.options.getSubcommand() === 'current') {
                queue.setRepeatMode(QueueRepeatMode.TRACK);
                interaction.reply({content: 'Looping current song.'})
            } else if (interaction.options.getSubcommand() === 'queue') {
                queue.setRepeatMode(QueueRepeatMode.QUEUE);
                interaction.reply({content: 'Looping current queue.'})
            } else if (interaction.options.getSubcommand() === 'stop') {
                queue.setRepeatMode(QueueRepeatMode.OFF);
                interaction.reply({content: 'Loop no more.'})
            }
        }
    },
};