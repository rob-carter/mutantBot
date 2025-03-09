const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play from a given source.'),
	async execute(interaction) {
		await interaction.reply('todo');
	},
};