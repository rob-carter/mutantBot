const { Events } = require('discord.js');
const { EventEmitter } = require('events');

const eventEmitter = new EventEmitter();

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);

        client.distube.on('error', (channel, error) => {
            console.error(error)
        })

        client.distube.on('playSong', (queue, song) => {
            var currentdate = new Date();
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + "@"
                + currentdate.getHours() % 12 + ":"
                + currentdate.getMinutes()

            console.log(`* ${song.name} | ${song.url} | ${datetime}`);
            eventEmitter.emit('playSong', queue, song);
        });

        },
};

module.exports.eventEmitter = eventEmitter;
