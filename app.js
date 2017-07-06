console.log("Starting Password Manager");

var storage = require('node-persist');
storage.initSync();

// account.name
// account.username
// account.password


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
		if (account.name == accountName) {
			match = account;
		}
	});

	return match;
}

var test = { 
	name : "Andrew", 
	username: "andrew", 
	password: "password"
}

var a = createAccount(test);
console.log(a);

var b = getAccount("Andrew");
console.log(b);

