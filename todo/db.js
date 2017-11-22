var Sequelize = require('sequelize');
var sequelize = new Sequelize(
	undefined,
	undefined,
	undefined, {
		'dialect': 'sqlite',
		'storage': __dirname + '\\data\\dev-todo-api.sqlite',
		'operatorsAliases': false
	}
);

const Ops = Sequelize.Op;

var db = {};

db.todo = sequelize.import(__dirname + "\\data\\models\\todo.js");
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Ops = Ops;

module.exports = db;