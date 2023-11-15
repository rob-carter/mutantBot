const { SlashCommandBuilder } = require('discord.js');
const { eventEmitter } = require('../../events/ready');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('jump')
        .setDescription('jump to specific song in queue')
        .addIntegerOption(option =>
            option.setName('element').setDescription('the song you want to jump to').setRequired(true)
            ),
    async execute(interaction) {
        await interaction.deferReply();
        const voice = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel;
        const queue = interaction.client.distube.getQueue(interaction.guild.id);

        if (!voice) {
            await interaction.editReply({ content: 'you must be in a voice channel before playing a song', ephemeral: true });
            return;
        }

        if (!queue) {
            await interaction.editReply({ content: 'nothing to replay', ephemeral: true });
            return;
        }
        
        let input = interaction.options.getInteger('element');
        
        await queue.jump(input-1)

        eventEmitter.once('playSong', (queue, song) => {
            interaction.editReply(`now playing: [${song.name}](<${song.url}>)`);
        });
    }
};
