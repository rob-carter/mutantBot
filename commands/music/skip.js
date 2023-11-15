const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('skip the current song'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guild.id);
        
        if (queue.songs.length === 1) {
            await interaction.client.distube.stop(interaction.guild.id);
        } else {
            await interaction.client.distube.skip(interaction.guild.id);
        }
        
        await interaction.reply('song skipped');
    }
}