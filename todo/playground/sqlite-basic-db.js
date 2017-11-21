var Sequelize = require('sequelize');
var sqlz = new Sequelize(
	undefined,
	undefined,
	undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '\\sqlite-basic-db.sqlite',
		'operatorsAliases': false
	}
);

const Ops = Sequelize.Op;

var ToDo = sqlz.define('todo', {
	description: {
		type: Sequelize.STRING,
		allowNull: false, 
		validate: { 
			len: [1, 250]
		}
	},
	completed: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
		defaultValue: false
	}
});

sqlz.sync({
	// force: true
}).then(function() {
	console.log("Sync completed");

	return ToDo.findOne( {
		where: {
			description: {
				[Ops.like]: "%learn%"
			}
		}
	})
	.then( function(todo) {
		if (todo) {
			console.log(todo.toJSON()); 
		} else {
			console.log("Todo not found");
		}
	})
	.catch(function(e){
		console.log(e);
	});

	// ToDo.create({
	// 	description: "learn sqlite and sequelize",
	// 	completed: false
	// })
	// .then(function(todo) {
	// 	return ToDo.create({
	// 		description: "Add database to To-Do Application"
	// 	});
	// })
	// .then(function() {
	// 	return ToDo.findAll({
	// 		where: {
	// 			completed: false
	// 		}
	// 	})
	// })
	// .then(function(todos) {
	// 	if (todos) { 
	// 		todos.forEach( function(todo) {
	// 			console.log(todo.toJSON());	
	// 		});
	// 	} else {
	// 		console.log("No todo found");
	// 	}
	// })
	// .catch(function(e) {
	// 	console.log(e);
	// });
});