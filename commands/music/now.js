const { SlashCommandBuilder } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('now')
		.setDescription('play track immediately.')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('the query to search for')
				.setRequired(true)),
	async execute(interaction) {
        return interaction.reply('todo :-)');
	}
};