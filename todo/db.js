var env = process.env.NODE_ENV || 'dev';
var Sequelize = require('sequelize');
var sequelize;

if (env === 'production') { 
	//DATABASE_URL is configured on heroku dashboard
	sequelize = new Sequelize(process.env.DATABASE_URL, { 
		dialect: 'postgres'
	});
} else { 
	sequelize = new Sequelize(
		undefined,
		undefined,
		undefined, {
			'dialect': 'sqlite',
			'storage': __dirname + '\\data\\dev-todo-api.sqlite',
			'operatorsAliases': false
		}
	);
}

const Ops = Sequelize.Op;

var db = {};

db.todo = sequelize.import(__dirname + "/data/models/todo.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Ops = Ops;

module.exports = db;