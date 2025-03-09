const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('shuffle')
		.setDescription('shuffle current queue.'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue)
            return interaction.reply('there is nothing to shuffle!');
        queue.tracks.shuffle();
        return interaction.reply('queue has been shuffled!');
	}
};