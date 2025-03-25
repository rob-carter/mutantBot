const { SlashCommandBuilder } = require('discord.js');
const { useQueue, useMainPlayer } = require('discord-player');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('now')
		.setDescription('play track immediately.')
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
		const query = interaction.options.getString('query', true);
		await interaction.deferReply();
        if (!queue || queue.node.isIdle()) {
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
		try {
			current = queue.currentTrack;
			search = await player.search(query, { requestedBy: interaction.user });
			queue.insertTrack(search.tracks[0], 0)
			queue.node.skip();
			return interaction.followUp(`${search.tracks[0].title} will begin playing now!`);
		} catch(error) {
			console.error(error);
			return interaction.reply('something went wrong with playing now...');
		}
		
	}
};