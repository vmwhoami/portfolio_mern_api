const express = require('express');

const router = express.Router();
const {
  getAllBlogPosts,
  createBlogPost,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogsController');
const requireLogin = require('../middleware/requireLogin');


router.route('/')
  .get(getAllBlogPosts)
  .post(requireLogin, createBlogPost);
router.route('/:id')
  .get(getBlogPost)
  .patch(requireLogin, updateBlogPost)
  .delete(requireLogin, deleteBlogPost);

module.exports = router;