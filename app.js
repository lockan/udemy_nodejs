console.log("Starting Password Manager");

var storage = require('node-persist');
storage.initSync();

var yargs = require('yargs');
var argv = yargs
	.command('create', 'Create an account', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Your name', 
				type: 'string'
			},
			account: {
				demand: true,
				alias: 'a',
				description: 'Account/Login', 
				type: 'string'
			},
			password: {
				demand: true,
				alias: 'l',
				description: 'Password', 
				type: 'string'
			}
		}).help('help');
	})
	.command('get', 'Retrieve an acount', function (yargs) {
		yargs.options({
			name: {
				demand: true,
				alias: 'n',
				description: 'Your name', 
				type: 'string'
			}
		}).help('help');
	})
	.help()
	.argv;


//create 
// --name, --user, --password

//get
// --name

function createAccount(account) {
	var accounts = storage.getItemSync('accounts');

	if (typeof(accounts === undefined)) { 
		accounts = [];
	}

	accounts.push(account);
	storage.setItemSync('accounts', accounts);

	return account;
}

function getAccount(accountName) { 
	var accounts = storage.getItemSync('accounts');
	
	var match = undefined;
	accounts.forEach(function(account) {
		if (account.name === accountName) {
			match = account;
		}
	});

	return match;
}

// ===== MAIN =====
var cmd = argv._[0];


if (cmd === 'create' 
	&& typeof(argv.name) === 'string' 
	&& typeof(argv.account) === 'string'
	&& typeof(argv.password) === 'string'
	)
{ 
	var newaccount = {
		name : 		argv.name, 
		account: 	argv.account, 
		password: 	argv.password
	}
	var created = createAccount(newaccount);
	console.log(created);
} 
else if (cmd === 'get' 
	&& typeof(argv.name) === 'string') 
{ 
	var found = getAccount(argv.name);
	(found != undefined) ? console.log(found) : console.log("Account '" + argv.name + "' not found");
}
else if (cmd === undefined) 
{
	yargs.showHelp("log");
}

