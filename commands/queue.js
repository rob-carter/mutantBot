const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('View the current song queue.'),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            let queueString = ''
            for (let i = 0; i < queue.tracks.length; i++) {
                if (i > 9) {
                    break
                }
                queueString = queueString + '`' + queue.tracks[i].duration + '`' + ` _${queue.tracks[i].title}_ ${queue.tracks[i].requestedBy}` + '\n'
            }
            const currentSong = queue.current
            let embed = new MessageEmbed()
            embed
                .setDescription(
                    `**Currently Playing**\n` + '`' + `${currentSong.duration}` + '`' + ` _${currentSong.title}_ ${currentSong.requestedBy}` + 
                    `\n\n**Queue**\n${queueString}`
                    )
                .setFooter({text: `Length: ${queue.tracks.length + 1}`})
                .setColor('#d5685e')
            await interaction.reply({embeds: [embed]})
        }
    },
};

