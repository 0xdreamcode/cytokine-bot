const https = require('https');
const fs = require('fs');
const Discord = require('discord.js');
const Tenor = require("tenorjs").client({
    "Key": "7DF45MF9H78C", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

module.exports = {
	name: '.kiss',
	description: 'Fetches an anime girl kiss from Tenor',
	execute(message, args) {

    Tenor.Search.Random("anime kiss", "3").then(res => {
      var img = res.random().media[0].gif.url
      var embed = new Discord.MessageEmbed();
      embed.setImage(img)
      message.channel.send(embed).catch(e => {
        message.channel.send(res.random().url)
      });
    }).catch(console.error);
	},
};
