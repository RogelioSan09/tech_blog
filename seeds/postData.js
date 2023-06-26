const { Post } = require('../models');

const postdata = [
  {
    title: 'Server-Side',
    username: '',
    creation_date: 'January 01, 2021 01:00:00',
    blog_id: 1,
    description:'',
  },
  {
    title: 'Front-End Experience',
    username: '',
    creation_date: 'August 13, 2023 12:00:00',
    gallery_id: 1,
    description: '',
  },
  {
    title: 'Models',
    username: '',
    creation_date: 'May 23, 2019 08:30:00',
    blog_id: 2,
    description: '',
  },
  {
    title: 'NPM Packages',
    username: '',
    creation_date: 'October 31, 2020 9:00:00',
    blog_id: 2,
    description: '',
  },
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;