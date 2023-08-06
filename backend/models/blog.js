'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      blog.belongsTo(models.user, { foreignKey: 'id_user' });
    }
  }
  blog.init({
    id_user: DataTypes.INTEGER,
    title_blog: DataTypes.STRING,
    content_blog: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'blog',
  });
  return blog;
};