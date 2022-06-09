const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('pause')
		.setDescription('Pause music playback.'),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            queue.setPaused(true)
            return interaction.reply({content: 'Music has been paused.'})
        }
    },
};

