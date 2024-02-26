"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable("locations");

    await queryInterface.createTable("locations", {
      location_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      rating: {
        type: Sequelize.DECIMAL(10, 1),
        allowNull: false,
        defaultValue: 0.0,
      },
      review_count: {
        type: Sequelize.DECIMAL(10),
        allowNull: true,
      },
      latitude: {
        type: Sequelize.DECIMAL(11, 6),
        allowNull: true,
      },
      longitude: {
        type: Sequelize.DECIMAL(11, 6),
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("locations");
  },
};
