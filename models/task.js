'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: true,
      },
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        notNull: true,
        notEmpty: true,
      },
    },
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};