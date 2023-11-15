const { SlashCommandBuilder } = require('discord.js');
const { eventEmitter } = require('../../events/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pauses playback'),
    async execute(interaction) {
        const voice = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel;
        const queue = interaction.client.distube.getQueue(interaction.guild.id);

        if (!voice) {
            await interaction.reply({ content: 'you must be in a voice channel before pausing', ephemeral: true });
            return;
        }

        if (!queue) {
            await interaction.reply({ content: 'nothing to pause', ephemeral: true });
            return;
        }
        
        if (!queue.playing) {
            await interaction.reply({ content: 'already paused', ephemeral: false });
            return;
        }
        
        queue.pause()
        await interaction.reply({ content: 'paused', ephemeral: false });
    }
};
