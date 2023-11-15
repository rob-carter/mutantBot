const { SlashCommandBuilder } = require('discord.js');
const { eventEmitter } = require('../../events/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('resume')
        .setDescription('resumes playback'),
    async execute(interaction) {
        const voice = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel;
        const queue = interaction.client.distube.getQueue(interaction.guild.id);

        if (!voice) {
            await interaction.reply({ content: 'you must be in a voice channel before resuming playback', ephemeral: true });
            return;
        }

        if (!queue) {
            await interaction.reply({ content: 'nothing to reume', ephemeral: true });
            return;
        }
        
        if (queue.playing) {
            await interaction.reply({ content: 'already playing', ephemeral: false });
            return;
        }

        queue.resume()
        await interaction.reply({ content: 'resumed', ephemeral: false });
    }
};
