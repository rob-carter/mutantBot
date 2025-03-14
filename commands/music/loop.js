const { SlashCommandBuilder } = require('discord.js');
const { useQueue, QueueRepeatMode } = require('discord-player');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('loop')
		.setDescription('loop current queue or track.')
		.addNumberOption(option =>
			option.setName('mode')
				.setDescription('the loop mode')
				.setRequired(true)
                .addChoices(
                    {
                        name: 'off',
                        value: QueueRepeatMode.OFF,
                    }, {
                        name: 'track',
                        value: QueueRepeatMode.TRACK,
                    }, {
                        name: 'queue',
                        value: QueueRepeatMode.QUEUE,
                    },
                )
            ),
	async execute(interaction) {
        const queue = useQueue(interaction.guild.id);
        if (!queue)
            return interaction.reply('nothing is playing!');
        const mode = interaction.options.getNumber('mode', true);
        queue.setRepeatMode(mode);
        return interaction.reply(`loop mode has been set to ${mode}.`); //TODO: convert mode to user friendly text
	}
};