// const { AudioFilters } = require("discord-player");

// AudioFilters.define("3D", "apulsator=hz=0.128");

// queue.setFilters({ "3D": true });

const { SlashCommandBuilder } = require('@discordjs/builders')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('filter')
		.setDescription('Apply filter to songs.')
        .addSubcommand((subcommand) =>
            subcommand
                .setName('apply')
                .setDescription('Apply filter.')
                .addStringOption((option) => 
                option
                    .setName('filter')
                    .setDescription(`Filter you want enabled.`)
                    .setRequired(true)
                    ))
        .addSubcommand((subcommand) =>
            subcommand
                .setName('disable')
                .setDescription('Disables all filters.')
                ),
	async execute(interaction) {
        const queue =  interaction.client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return interaction.reply({content: 'The queue is empty.', ephemeral: true})
        } else {
            if (interaction.options.getSubcommand() === 'apply') {
                const filter = interaction.options.getSubcommand() === 'filter'
                interaction.reply({content: 'Not imp yet...'}) //TODO:
            } else if (interaction.options.getSubcommand() === 'disable') {
                interaction.reply({content: 'Not imp yet...'}) //TODO:
            }
        }
    },
};

