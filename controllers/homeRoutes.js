const router = require('express').Router();
// Import the Blog and Post data from models directory
const { Blog, Post } = require('../models');
// Import the custom middleware
const {withAuth, areAuth } = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const bdBlogData = await Blog.findAll({
      include: [
        {
          model: Post,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const blogs = bdBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('homepage', {
      blogs,
      loggedIn: req.session.loggedIn,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog
// Use the custom middleware before allowing the user to access the blog
router.get('/blog/:id', withAuth, async (req, res) => {
    try {
      const dbBlogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: Post,
            attributes: [
              'id',
              'title',
              'author',
              'post_date',
              'description',
            ],
          },
        ],
      });
  
      const blog = dbBlogData.get({ plain: true });
      res.render('blog', { blog, loggedIn: req.session.loggedIn });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// GET one post
// Use the custom middleware before allowing the user to access the post
router.get('/post/:id', withAuth, async (req, res) => {
    try {
      const dbPostData = await Post.findByPk(req.params.id);
  
      const post = dbPostData.get({ plain: true });
  
      res.render('post', { post, loggedIn: req.session.loggedIn });

    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

router.get('/post/:id', (req, res, next) => {
    // If the user is not logged in, redirect the user to the login page
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute the route function that will allow them to view the blogs
      // We call next() if the user is authenticated
      next();
    }
  }, async (req, res) => {
    try {
      const dbPostData = await Post.findByPk(req.params.id);
  
      const post = dbPostData.get({ plain: true });
  
      res.render('post', { post, loggedIn: req.session.loggedIn });
      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.get('/login', areAuth, (req, res) => {
    res.render('login');
});
  
module.exports = router;