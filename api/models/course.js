'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // Define a Course class that extends the Sequelize Model class
  class Course extends Model {}

  // Initialize the Course model with the specified attributes and validations
  Course.init({
    // Course's title attribute
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A Title is required',
        },
        notEmpty: {
          msg: 'Please provide a Title',
        },
      },
    }, 
    // Course's description attribute
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A Description is required',
        },
        notEmpty: {
          msg: 'Please provide a Description',
        },
      },
    },
    // Course's estimated time attribute
    estimatedTime: {
        type: DataTypes.STRING,
    },
    // Course's materials needed attribute
    materialsNeeded: {
        type: DataTypes.STRING,
    },
  }, 
  // Model options 
  { 
    sequelize, 
    modelName: 'Course', 
  });

  // Set up the association with the User model
  Course.associate = (model) => {
    Course.belongsTo(model.User, { 
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      },
    });
  };

  // Return the Course model
  return Course;
};
