var argv = require('yargs')
	.command('hello', 'Greets the user', function(yargs) {
		yargs.options({
			name: {
				demand: true, 
				alias: 'n', 
				description: 'Your first name'
			}, 
			lname: { 
				demand: false,
				alias: 'l', 
				description: "Your last name"
			}
		}).help('help');
	})
	.help('help')
	.argv;

var cmd = argv._[0];

console.log(argv);

if (cmd === 'hello' && typeof(argv.name) !== 'undefined' && typeof(argv.lname) !== 'undefined') {
	console.log('Hello ' + argv.name + ' '+  argv.lname+'!');
} 
else if (cmd === 'hello' && typeof(argv.name) !== 'undefined') { 
	console.log('Hello ' + argv.name + '!');
} else if (cmd === 'hello') { 
	console.log('Hello World!');
}
