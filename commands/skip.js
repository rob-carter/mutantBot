const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription('Skips current song.'),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            queue.skip()
            const song  = queue.current
            let embed = new MessageEmbed()
            embed
                .setTitle(song.title)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setDescription('Has been skipped.')
                .setFooter({text: `${song.duration}`})
                .setColor('#d5685e')
            await interaction.reply({embeds: [embed]})
        }
    },
};

