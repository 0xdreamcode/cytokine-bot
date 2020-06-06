module.exports = {
	name: 'hi',
	description: 'Hi-hello',
	execute(message, args) {
		message.channel.send('Heya!');
	},
};
