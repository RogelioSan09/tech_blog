const { Blog } = require('../models');

const blogdata = [
  {
    name: 'Server-Side',
    created_date: 'January 01, 2021 01:00:00',
  },
  {
    name: 'Front-End Experience',
    created_date: 'August 13, 2023 12:00:00',
  },
  {
    name: 'Models',
    created_date: 'May 23, 2019 08:30:00',
  },
  {
    name: 'NPM Packages',
    created_date: 'October 31, 2020 9:00:00',
  },
];

const seedBlog = () => Blog.bulkCreate(blogdata);

module.exports = seedBlog;