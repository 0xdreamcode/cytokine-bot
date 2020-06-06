module.exports = {
	name: '.info',
	description: 'Hi-hello',
	execute(message, args) {
		var str = '';
		message.client.commands.forEach(cmd => {

			str += '`' + cmd.name + '` ' + cmd.description + '\n'
		})
		message.channel.send(str)
	},
};
