const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//Import model middleware
class Comment extends Model {};

//Blog init
Comment.init(
  {
    //id 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    //user_id ties to User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    //blog_id ties to Blog Model
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    timeStamps: false,
    freezeTableName: true,
    underScored: true,
    modelName: 'comment'
  }
);

module.exports = Comment;