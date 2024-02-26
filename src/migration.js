const { Sequelize } = require("sequelize");

const { Location } = require("./models/location");
const createDatabase = require("./models/db");
const initialLocations = require("./data/initial-locations.json");

const db = createDatabase();

const findOrCreateLocation = async (locationData) => {
  await Location.findOrCreate(
    {
      where: {
        name: locationData.name,
      },
      defaults: {
        location_id: locationData.location_id,
        name: locationData.name,
        description: locationData.description,
        category: locationData.category,
        rating: locationData.rating,
        review_count: locationData.review_count,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        created_at: locationData.created_at,
        updated_at: locationData.updated_at,
      },
    }
  );
};

const runMigrations = async () => {
  try {
    const fileName = "20240226144323-insert-locations.js";
    const migration = require(__dirname + "/migrations/" + fileName);
    await migration.up(db.getQueryInterface(), Sequelize);

    for (const locationData of initialLocations) {
      await findOrCreateLocation(locationData);
    }

    console.log("Migrations have been executed successfully.");
  } catch (error) {
    console.error("Error executing migrations:", error);
  } finally {
    await db.close();
  }
};

module.exports = { runMigrations };
