const { Location } = require("../models/location");

// wrap all in try and catch

module.exports = {
  getAll: async ({ page = 1, pageSize = 20, category }) => {
    const offset = page === 1 ? 0 : page * pageSize;
    const limit = pageSize;

    if (category) {
      return await Location.findAll({ where: { category }, offset, limit });
    }

    return await Location.findAll({ offset, limit });
  },

  getOne: async ({ location_id }) => {
    return await Location.findAll({ where: { location_id } });
  },

  createNewLocation: async (locationData) => {
    const res = await Location.create(locationData);

    return { location_id: res.location_id, message: "Successfully added!" };
  },

  updateById: async ({ location_id }, locationData) => {
    await Location.update(locationData, { where: { location_id } });
  },

  updateByCategory: async (locationData) => {
    // test for multiple
    await Location.update({
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
    { where: { category: locationData.category } });
  },

  deleteById: async ({ location_id }) => {
    await Location.destroy({ where: { location_id } });
  },
};
