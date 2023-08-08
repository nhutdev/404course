'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class like_blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  like_blog.init({
    id_user: DataTypes.INTEGER,
    id_blog: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'like_blog',
  });
  return like_blog;
};