console.log("Starting Password Manager");

var storage = require('node-persist');
storage.initSync();

var crypto = require('crypto-js');

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
			}, 
			masterPassword: {
				demand: true, 
				alias: 'd',
				type: 'string',
				description: 'master password' 
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
			}, 
			masterPassword: {
				demand: true, 
				alias: 'd',
				type: 'string',
				description: 'master password' 
			}
		}).help('help');
	})
	.help()
	.argv;


//create 
// --name, --user, --password

//get
// --name

function getAccounts(masterPassword) {
	// use getItemSync to fetch accounts
	var accountData = storage.getItemSync('accounts');
	if (typeof(accountData === undefined)) { 
		accountData = [];
	}

	//decrypt
	var accBytes = crypto.AES.decrypt(accountData, masterPassword);
	//var accounts = JSON.parse(accBytes.toString(crypto.AES.Utf8));
	return JSON.parse(accBytes.toString(crypto.AES.Utf8));
}

function saveAccounts(accounts, masterPassword) {
	// Encrypt accounts array
	crypto.encrypt(JSON.stringify(accounts), masterPassword);
	// setItemSync to save the encrypted accounts
	storage.setItemSync('accounts');
	// Return accounts
	return accounts;
}

function createAccount(account, masterPassword) {
	/*
	var accounts = storage.getItemSync('accounts');

	if (typeof(accounts === undefined)) { 
		accounts = [];
	}
	*/
	var accounts = getAccounts(masterPassword);
	accounts.push(account);
	//storage.setItemSync('accounts', accounts);
	accounts = saveAccounts();

	return account;
}

function getAccount(accountName, masterPassword) { 
	//var accounts = storage.getItemSync('accounts');
	var accounts = getAccounts(masterPassword);
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
	&& typeof(argv.masterPassword === 'string'
	)
{ 
	var newaccount = createAccount({
		name : 		argv.name, 
		account: 	argv.account, 
		password: 	argv.password
	}, argv.masterPassword);
	console.log("Account created: " + newaccount);
} 
else if (cmd === 'get' 
	&& typeof(argv.name) === 'string'
	&& typeof(argv.masterPassword) === 'string' 
	)
{ 
	var found = getAccount(argv.name, argv.masterPassword);
	(found != undefined) ? console.log(found) : console.log("Account '" + argv.name + "' not found");
}
else if (cmd === undefined) 
{
	yargs.showHelp("log");
}

