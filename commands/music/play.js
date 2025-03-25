const { SlashCommandBuilder } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('play from a given source.')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('the query to search for')
				.setRequired(true)),
	async execute(interaction) {
		const player = useMainPlayer();
		const channel = interaction.member.voice.channel;
		if (!channel)
			return interaction.reply('you need to be in a voice channel!'); 
		const query = interaction.options.getString('query', true);
		await interaction.deferReply();
		try {
			const { track } = await player.play(channel, query, {
				nodeOptions : {
					metadata: interaction
				}
			});
			return interaction.followUp(`${track.title} has been added to the queue!`);
		} catch (error) {
			console.error(error);
			return interaction.followUp('something went wrong with playing that track.');
		}
	}
};