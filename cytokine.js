const fs = require('fs');
const Discord = require('discord.js');
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

const client = new Discord.Client();
client.commands = new Discord.Collection();

var servers = {
  "676881899167416331": {
    "welcomeChannel": "676906443168940042",
    "generalChannel": "676881899167416343",
    "memberRole": "676906111403687987",
    "permanentInvite": "https://discord.gg/hdMKFXS"
  }
}



client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log('Loading commands...')
  const commandFiles = fs.readdirSync('./trapan_bot/commands').filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
  	const command = require(`./commands/${file}`);
    console.log(command.name,'-',command.description)
  	// set a new item in the Collection
  	// with the key as the command name and the value as the exported module
  	client.commands.set(command.name, command);
  }

});

client.on('message', msg => {
  var tokens = msg.cleanContent.split(' ')
  if (client.commands.get(tokens[0]) && !msg.author.bot) {
    client.commands.get(tokens[0]).execute(msg, tokens);
  }
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

client.login('NzE4MjQ2NjMyNjI1Mjc0OTMw.XtmFcw.XLDvAShezziKAonC0imXJ2St1ZA');
