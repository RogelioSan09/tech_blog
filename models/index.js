const User = require('./User');
const Blog = require('./Blog');
const Post = require('./Post');

// Blog has many Post
Blog.hasMany(Post, {
    foreignKey: 'blog_id',
});

// Post belongs to Blog
Post.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

module.exports = { User };