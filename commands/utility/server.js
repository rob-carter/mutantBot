const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('provides information about the server.'),
    async execute(interaction) {
        await interaction.reply(`server name: ${interaction.guild.name}\ntotal members: ${interaction.guild.memberCount}`);
    },
};