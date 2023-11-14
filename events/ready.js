const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.distube.on('error', (channel, error) => {
            console.error(error)
        })
        client.distube.on('PLAY_SONG', (channel, song) => {
            console.log(channel)
        })

        },
};