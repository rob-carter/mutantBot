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
        if (!queue) {
            queue = player.nodes.create(interaction.guild, {
                metadata: interaction
            });
        }
		const query = interaction.options.getString('query', true);
		await interaction.deferReply();
		return interaction.reply(':-)');
	}
};