const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('provides information about the server.'),
    async execute(interaction) {
        await interaction.reply(`this server is ${interaction.guild.name} and has ${interaction.guild.memberCount} members.`);
        },
};