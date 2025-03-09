const { SlashCommandBuilder } = require('discord.js');
const { useHistory } = require('discord-player');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('history')
		.setDescription('play last track.'),
	async execute(interaction) {
        const history = useHistory(interaction.guild.id);
        if (!history)
            return interaction.reply('there is no history!');
        await history.previous();
        return interaction.reply('playing last track!');
	}
};