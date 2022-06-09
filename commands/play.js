const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play content from YouTube.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('song')
                .setDescription('Play song from YouTube URL.')
                .addStringOption((option) => 
                    option
                        .setName('url')
                        .setDescription(`The song's URL.`)
                        .setRequired(true))
                        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('playlist')
                .setDescription('Play playlist from YouTube URL.')
                .addStringOption((option) => 
                    option
                        .setName('url')
                        .setDescription(`The playlist's URL.`)
                        .setRequired(true))
                        )
        .addSubcommand((subcommand) =>
            subcommand
                .setName('search')
                .setDescription('Search for a song to play on YouTube.')
                .addStringOption((option) => 
                    option
                        .setName('query')
                        .setDescription(`Search query.`)
                        .setRequired(true))
                        ),
	async execute(interaction) {
        if (!interaction.member.voice.channel) {
            return interaction.reply({content: 'You must be in a voice channel to summon the bot.', ephemeral: true})
        }
        const queue = await interaction.client.player.createQueue(interaction.guild)
        let embed = new MessageEmbed()
        if (interaction.options.getSubcommand() === 'song') {
            let url = interaction.options.getString('url')
            const result = await interaction.client.player.search(url, {
                requestBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0) {
                return interaction.reply({content: 'Song not found.', ephemeral: true})
            }
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setTitle(song.title)
                .setURL(song.url)
                .setImage(song.thumbnail)
                .setFooter({text: `${song.duration}`})
                .setColor('#d5685e')
        }
        if (!queue.playing) {
            await queue.connect(interaction.member.voice.channel)
            await queue.play()
        }
        await interaction.reply({embeds: [embed]})
    },
};