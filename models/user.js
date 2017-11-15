module.exports = function(sequelize, DataTypes){

	var user = sequelize.define("user", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
    	autoIncrement: true,
			allowNull: false
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false,
			},
			streetAddress: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		city: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		fbUserId: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		oAuthToken: {
			type: DataTypes.STRING,
			allowNull: false,
			},
		aboutMe: {
			type: DataTypes.Text,
			allowNull: true,
			},
		isActive: {
			type: DataTypes.Boolean,
			allowNull: false,
			defaultValue: true
			},
		}	
	});
	
	return user;
};