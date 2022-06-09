const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')
const { QueryType } = require('discord-player')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play content from YouTube.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('url')
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
        if (interaction.options.getSubcommand() === 'url') {
            let url = interaction.options.getString('url')
            const result = await interaction.client.player.search(url, {
                requestedBy: interaction.user,
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
        } else if (interaction.options.getSubcommand() === 'playlist') {
            let url = interaction.options.getString('url')
            const result = await interaction.client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if (result.tracks.length === 0) {
                return interaction.reply({content: 'Playlist not found.', ephemeral: true})
            }
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setTitle(playlist.title)
                .setURL(playlist.url)
                .setThumbnail(playlist.thumbnail)
                .setFooter({text: `${result.tracks.length} songs added.`})
                .setColor('#d5685e')
        } else if (interaction.options.getSubcommand() === 'search') {
            let query = interaction.options.getString('query')
            const result = await interaction.client.player.search(query, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.length === 0) {
                return interaction.reply({content: 'Nothing found.', ephemeral: true})
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