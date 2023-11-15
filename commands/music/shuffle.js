const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('shuffle the queue'),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guild.id);
        
        if (!queue) {
            await interaction.reply({content: 'nothing to shuffle', ephemeral: true});
            return;
        }
        
        await interaction.client.distube.shuffle(interaction.guild.id);
        
        let res = 'playlist shuffled\n';
        
        if (queue.songs.length < 5) {
            for (let i = 0; i < queue.songs.length; i++) {
                res += `${i+1}: [${queue.songs[i].name}](<${queue.songs[i].url}>)\n`
            }
        } else {
            for (let i = 0; i < 5; i++) {
                res += `${i+1}: [${queue.songs[i].name}](<${queue.songs[i].url}>)\n`
            }
        }
        
        await interaction.reply({content: `${res}`});
    }
}