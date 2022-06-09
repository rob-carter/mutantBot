module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`); //TODO: return command name
        if (!interaction.isCommand()) return;
        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) return;
        try { 
            command.execute(interaction); 
        } catch {
            console.error(error);
            interaction.reply({content: 'There was an error while executingthis command!', ephemeral: true})
        }
	},
};