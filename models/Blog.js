const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Import model middleware
class Blog extends Model {};
//Blog init
Blog.init(
  {
    //id 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //title
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //description
    description: {
      type: DataTypes.STRING,
    },
    //date_created
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    //user_id
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timeStamps: false,
    freezeTableName: true,
    underScored: true,
    modelName: 'blog'
  }
);

module.exports = Blog;