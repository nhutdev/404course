'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follow_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      follow_useruser.belongsTo(models.user, { foreignKey: 'to_user' });
      follow_useruser.belongsTo(models.user, { foreignKey: 'from_user' });
    }
  }
  follow_user.init({
    to_user: DataTypes.INTEGER,
    from_user: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'follow_user',
  });
  return follow_user;
};