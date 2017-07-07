var argv = require('yargs').argv;
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
