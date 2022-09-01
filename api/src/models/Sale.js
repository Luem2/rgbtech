const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('sale', {
    id : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
    productId: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    productPrice:{
        type:DataTypes.FLOAT,
        allowNull:false
      },
    amount : {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    month: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },{
    timestamps: false
  })}