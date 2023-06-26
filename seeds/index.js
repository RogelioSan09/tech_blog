const sequelize = require('../config/connection');
const seedBlog = require('./blogData');
const seedPost = require('./postData');

// Seed all tables
const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedBlog();

  await seedPost();

  process.exit(0);
};

seedAll();