const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('replies with pong!'),
    async execute(interation) {
        await interation.reply('pong!');
    }
}