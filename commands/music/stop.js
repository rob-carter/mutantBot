const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('stop current queue.'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue)
            return interaction.reply('no queue to stop!');
        queue.delete();
        return interaction.reply('queue stopped!');
	}
};