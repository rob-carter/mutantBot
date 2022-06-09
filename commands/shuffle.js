const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('Shuffle the queue.'),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            queue.shuffle()
            return interaction.reply({content: 'Queue has been shuffled'})
        }
    },
};

