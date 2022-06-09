const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('previous')
		.setDescription('Replay previous song.'),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            console.log(queue.previousTracks)
            console.log(queue.previousTracks.length)
            if (queue.previousTracks.length === 1) {
                return interaction.reply({content: 'No previous tracks.', ephemeral: true})
            } else {
                queue.back()
                const song  = queue.current
                let embed = new MessageEmbed()
                embed
                    .setTitle(song.title)
                    .setURL(song.url)
                    .setThumbnail(song.thumbnail)
                    .setDescription('Replaying this song.')
                    .setFooter({text: `${song.duration}`})
                    .setColor('#d5685e')
                await interaction.reply({embeds: [embed]})
            }
        }
    },
};