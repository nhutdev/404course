'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.reset_password, { foreignKey: 'id_user' });
      user.hasMany(models.course, { foreignKey: 'id_user' });
      user.hasMany(models.question_course, { foreignKey: 'id_user' });
      user.hasMany(models.like_blog, { foreignKey: 'id_user' });
      user.hasMany(models.comment_blog, { foreignKey: 'id_user' });


    }
  }
  user.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.ENUM('creator','learner','admin')
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};