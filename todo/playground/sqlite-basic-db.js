var Sequelize = require('sequelize');
var sqlz = new Sequelize(
	undefined, 
	undefined, 
	undefined, 
	{ 
		'dialect' : 'sqlite', 
		'storage' : __dirname + '\\sqlite-basic-db.sqlite', 
		'operatorsAliases' : false
	}
);

var ToDo = sqlz.define('todo', 
	{ 
		description: { type: Sequelize.STRING }, 
		completed: { type: Sequelize.BOOLEAN }
	}
);

sqlz.sync({force:true}).then(function() { 
	console.log("Sync completed");

	ToDo.create(
		{
			description: "learn sqlite and sequelize",
			completed: false
		}
	).then(function(todo) {
		console.log('Finished');
		console.log(todo);
	});
});