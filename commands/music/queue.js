const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('show first 10 songs of the current queue'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guild.id);

        if (!queue) {
            await interaction.reply({content: 'queue empty', ephemeral: false});
            return;
        }

        let res = '';

        if (queue.songs.length < 10) {
            for (let i = 0; i < queue.songs.length; i++) {
                res += `${i+1}: [${queue.songs[i].name}](<${queue.songs[i].url}>)\n`
            }
        } else {
            for (let i = 0; i < 10; i++) {
                res += `${i+1}: [${queue.songs[i].name}](<${queue.songs[i].url}>)\n`
            }
        }

        await interaction.reply({content: `${res}`});
    }
}