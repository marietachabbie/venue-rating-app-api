const { Sequelize, DataTypes } = require("sequelize");
const createDatabase = require("./db");

const db = createDatabase();

const Location = db.define("location", {
  location_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rating: {
    type: DataTypes.DECIMAL(10, 1),
    allowNull: false,
    defaultValue: 0.0,
  },
  review_count: {
    type: DataTypes.DECIMAL(10),
    allowNull: true,
  },
  latitude: {
    type: DataTypes.DECIMAL(11, 6),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 6),
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
  },
  updated_at: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.fn("now"),
  },
}, {
  timestamps: false,
});

module.exports = { Location };
