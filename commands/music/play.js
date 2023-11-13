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
        console.log(input)
        //interation.client.distube.play(interation.message.member.voiceChannel, "WARNING touhou", { position: 1 })
    }
}