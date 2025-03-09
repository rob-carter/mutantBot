const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('skip current track.'),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue)
            return interaction.reply('there is nothing to skip!');
        queue.node.skip();
        return interaction.reply('track has been skipped!');
	}
};