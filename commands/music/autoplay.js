const { SlashCommandBuilder } = require('discord.js');
const { eventEmitter } = require('../../events/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autoplay')
        .setDescription('autoplay related content'),
    async execute(interaction) {
        const voice = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel;
        const queue = interaction.client.distube.getQueue(interaction.guild.id);

        if (!voice) {
            await interaction.reply({ content: 'you must be in a voice channel before playing a song', ephemeral: true });
            return;
        }

        if (!queue) {
            await interaction.reply({ content: 'nothing to autoplay', ephemeral: true });
            return;
        }

        const mode = queue.toggleAutoplay()
        
        if (mode) {
            await interaction.reply('enabling autoplay')
        } else {
            await interaction.reply('disabling autoplay')
        }
        
        
    }
};
