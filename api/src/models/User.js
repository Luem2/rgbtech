const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
	sequelize.define(
		"user",
		{
			id: {
				type: DataTypes.UUID,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
				primaryKey: true,
			},
			user: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			mail: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			profilePhoto: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			cartShop: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
			},
			favorite: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				allowNull: true,
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
		},
		{
			timestamps: false,
		}
	);
};
