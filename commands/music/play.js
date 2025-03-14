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
		let queue = useQueue(interaction.guild.id);
		const channel = interaction.member.voice.channel;
		if (!channel)
			return interaction.reply('you need to be in a voice channel!');
        if (!queue) {
            queue = player.nodes.create(interaction.guild, {
                metadata: interaction
            });
        }
		const query = interaction.options.getString('query', true);
		await interaction.deferReply();
		if (query === 'auto') {
			try {
				await player.play(channel, process.env.AUTO, {
					nodeOptions : {
						metadata: interaction
					}
				});
				queue.tracks.shuffle();
				return interaction.followUp('playing autoplaylist!');
			} catch (error) {
				console.error(error);
				return interaction.followUp('something went wrong with autoplaylist.');
			}
		}
		try {
			// const { track } = await player.play(channel, query, {
			// 	nodeOptions : {
			// 		metadata: interaction
			// 	}
			// });
			// return interaction.followUp(`${track.title} has been added to the queue!`);
			track = await player.search(query, { requestedBy: interaction.user });
			queue.insertTrack(track.tracks[0]);
			if (!queue.isPlaying()) {
				await player.play(channel, "https://www.youtube.com/watch?v=1VXMLuZkq1g", { //TODO: remove this hack
					nodeOptions : {
						metadata: interaction
					}
				});
			}
			return interaction.followUp(`${track.tracks[0].title} has been added to the queue!`);
		} catch (error) {
			console.error(error);
			return interaction.followUp('something went wrong with playing that track.');
		}
	}
};