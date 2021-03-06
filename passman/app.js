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
				alias: 'm',
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
				alias: 'm',
				type: 'string',
				description: 'master password' 
			}
		}).help('help');
	})
	.help()
	.argv;


function getAccounts(masterPassword) {
	// use getItemSync to fetch accounts
	var accountData = storage.getItemSync('accounts');
	if (typeof accountData === undefined) { 
		accountData = [];
		console.log("getAccounts returned an empty array");
		return accountData;
	}
	//decrypt
	var accBytes = crypto.AES.decrypt(accountData, masterPassword);
	//var accounts = JSON.parse(accBytes.toString(crypto.AES.Utf8));
	var accounts = JSON.parse(accBytes.toString(crypto.enc.Utf8));
	return accounts;

}

function saveAccounts(accounts, masterPassword) {
	// Encrypt accounts array
	var accountsData = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
	// setItemSync to save the encrypted accounts
	storage.setItemSync('accounts', accountsData.toString());
	// Return accounts
	
	return accounts;
}

function createAccount(account, masterPassword) {
	var accounts = getAccounts(masterPassword);
	accounts.push(account);
	accounts = saveAccounts(accounts, masterPassword);

	return account;
}

function getAccount(accountName, masterPassword) { 
	var accounts = getAccounts(masterPassword);
	if (accounts === undefined) {
		console.log("No accounts found.");
		return undefined;
	}
	
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
	&& typeof(argv.masterPassword) === 'string'
	)
{
	try {
		var newaccount = createAccount({
		name : 		argv.name, 
		account: 	argv.account, 
		password: 	argv.password
		}, argv.masterPassword);
		console.log("Account created: " + newaccount.name);
	}
	catch (err) { 
		Console.log("Error: Unable to create account");
	}

} 
else if (cmd === 'get' 
	&& typeof(argv.name) === 'string'
	&& typeof(argv.masterPassword) === 'string' 
	)
{ 
	try {
		var found = getAccount(argv.name, argv.masterPassword);
		(found != undefined) ? console.log(found) : console.log("Account '" + argv.name + "' not found"); 
	}
	catch (err) { 
		console.log("Error: unable to get account");
	}
}
else if (cmd === undefined) 
{
	yargs.showHelp("log");
}

