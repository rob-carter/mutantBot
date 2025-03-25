const { SlashCommandBuilder, enableValidators } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
	data: new SlashCommandBuilder()
		.setName('auto')
		.setDescription('play from your autoplaylist.'),
	async execute(interaction) {
		const player = useMainPlayer();
		let queue = useQueue(interaction.guild.id);
		const channel = interaction.member.voice.channel;
		if (!channel)
			return interaction.reply('you need to be in a voice channel!'); 
		await interaction.deferReply();
		try {
			await player.play(channel, process.env.TOKEN, {
				nodeOptions : {
					metadata: interaction
				}
			});
            queue.tracks.shuffle();
			return interaction.followUp('playing your autoplaylist');
		} catch (error) {
			console.error(error);
			return interaction.followUp('something went wrong with playing your autoplaylist.');
		}
	}
};