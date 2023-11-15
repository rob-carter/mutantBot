const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('loop current song or queue')
        .addIntegerOption(option =>
            option.setName('mode')
                .setDescription('select the loop mode')
                .setRequired(true)
                .addChoices({ name: 'disable', value: 0}, { name: 'song', value: 1 }, { name: 'queue', value: 2 },)),
    async execute(interaction) {
        const queue = interaction.client.distube.getQueue(interaction.guild.id);

        if (!queue) {
            await interaction.reply({content: 'nothing to loop', ephemeral: false});
            return;
        }
        
        const input = interaction.options.getInteger('mode');
        
        switch (input) {
            case 0:
                queue.setRepeatMode(0);
                await interaction.reply({content: 'ending loop', ephemeral: false});
                break;
            case 1:
                queue.setRepeatMode(1);
                await interaction.reply({content: 'looping current song', ephemeral: false});
                break;
            case 2:
                queue.setRepeatMode(2);
                await interaction.reply({content: 'looping current queue', ephemeral: false});
                break;
        }
    }
}