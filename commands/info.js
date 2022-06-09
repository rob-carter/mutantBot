const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Get info on current song.'),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            let progBar = queue.createProgressBar({
                queue: false,
                length: 19
            })
            const song  = queue.current
            let embed = new MessageEmbed()
            embed
                .setTitle(song.title)
                .setURL(song.url)
                .setThumbnail(song.thumbnail)
                .setDescription(progBar)
                .setFooter({text: `${song.duration}`})
                .setColor('#d5685e')
            await interaction.reply({embeds: [embed]})
        }
    },
};

