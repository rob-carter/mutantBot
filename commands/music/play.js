const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song from source')
        .addStringOption(option =>
            option.setName('source').setDescription('the thing you want to play').setRequired(true)
        ),
    async execute(interation) {
        const input = interation.options.getString('source');
        const voice = interation.guild.members.cache.get(interation.member.user.id).voice.channel;

        await interation.client.distube.play(voice, input, { skip: true });
    }
}