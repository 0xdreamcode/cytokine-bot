const Discord = require('discord.js');
const client = new Discord.Client();

var servers = {
  "676881899167416331": {
    "welcomeChannel": "676906443168940042",
    "generalChannel": "676881899167416343",
    "memberRole": "676906111403687987",
    "permanentInvite": "https://discord.gg/XDz3Rfm"
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

});

client.on('guildMemberUpdate', (oldm, newm) => {


  if (newm._roles.includes(servers[newm.guild.id].memberRole) &&
      !oldm._roles.includes(servers[oldm.guild.id].memberRole))
  {
    var embed = new Discord.MessageEmbed()
      .setColor('#ffccff')
      .setTitle('Welcome!')
      .addField(`Please say hello to`, `<@${newm.user.id}> who has just been accepted into the server. Please give them a warm welcome :3`)
    embed.setThumbnail(newm.user.avatarURL())
    newm.guild.channels.resolve(servers[newm.guild.id].generalChannel).send(embed);

    var embed = new Discord.MessageEmbed()
      .setColor('#ffccff')
      .setTitle('Welcome to ' + newm.guild.name)
      .addField(`You have been approved`, `Please follow this [link](${servers[newm.guild.id].permanentInvite}) to go to the server.`)
    embed.setThumbnail(newm.guild.iconURL())
    newm.user.send(embed)
  }
});

client.on('guildMemberAdd', member => {
  var embed = new Discord.MessageEmbed()
    .setColor('#ffccff')
    .setTitle('Welcome to ' + member.guild.name)
    .addField(`Hi,`, `<@${member.user.id}> and welcome to our server. I hope you enjoy your stay uwu\n\nPlease wait while staff gives you access to the server.`)

  if (!member.user.avatar) {
    embed.addField(`NO PFP!`, `Please add a profile picture so you can be validated.`)
  } else {
    embed.setThumbnail(member.user.avatarURL())
  }

  embed.addField(`Account created`, member.user.createdAt)

  member.guild.channels.resolve(servers[member.guild.id].welcomeChannel).send(embed);
});

client.login(require('./token.json');
