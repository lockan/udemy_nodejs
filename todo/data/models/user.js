module.exports = function(sequelize, DataTypes) { 
	return sequelize.define('user', {
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: { 
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { 
				len: { 
					args: [8, 100],
					msg: "Password must be between 8 and 100 characters."
				},
				is: { 
					args: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!"#\$%&'()*+,-.:;<=>?@\^_`{|}~]).*$/g,
					msg: "Must contain one upper, one lower, one numeric, one special."
				}
			}
		}
	})
};