const { Model, DataTypes, STRING } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');
//this class extention includes a function thatchecks the hashed password when logging in
class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    //id 
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //email
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    //password
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      },
    },
  },
  {
    //sequelize hooks for the User model, hashs password field of new or updated passwords
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    //SQL naming convention translation
    underScored: true,
    modelName: 'user',
  }
);

module.exports = User;