const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('leave')
		.setDescription('Wipe queue and makes bot leave.'),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            queue.destroy()
            return interaction.reply({content: 'bye bye!'})
        }
    },
};

