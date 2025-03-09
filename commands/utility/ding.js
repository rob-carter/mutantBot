const { SlashCommandBuilder } = require('discord.js');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ding')
        .setDescription('replies with dong!'),
    async execute(interaction) {
        await interaction.reply('dong!');
    }
};