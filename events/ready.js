const { Events, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');


module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

//        client.distube.on('error', (channel, error) => {
//            console.error(error)
//        })

        client.distube.on('playSong', (queue, song) => {
            var currentdate = new Date();
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes()

            console.log('* ', song.name, song.url, datetime)
        })

        },
};