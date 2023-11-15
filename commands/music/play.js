const { SlashCommandBuilder } = require('discord.js');
const { eventEmitter } = require('../../events/ready');
require('dotenv').config();


module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('play a song from source')
        .addStringOption(option =>
            option.setName('source').setDescription('the thing you want to play').setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();

        const voice = interaction.guild.members.cache.get(interaction.member.user.id).voice.channel;

        if (!voice) {
            await interaction.reply({ content: 'you must be in a voice channel before playing a song', ephemeral: true });
            return;
        }

        let input = interaction.options.getString('source');
        let isTurkey = false;

        if (input === 'turkey') {
            input = process.env.TURKEY
            isTurkey = true;
        }

        eventEmitter.once('playSong', (queue, song) => {
            setTimeout(function() {}, 5000)
            if (isTurkey) {
                interaction.editReply(`now playing: [turkey neckin](<${process.env.TURKEY}>)`)
            } else {
                interaction.editReply(`now playing: [${song.name}](<${song.url}>)`);
            }

        });

        await interaction.client.distube.play(voice, input, { skip: true });

        if (isTurkey) {
            await interaction.client.distube.shuffle(interaction.guild.id);
            await interaction.client.distube.skip(interaction.guild.id);
        }
    }
};
