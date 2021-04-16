const express = require('express');

const router = express.Router();
const {
  getAllPortfolioItems,
  createPortfolioItem,
  getPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfoliosController');
const requireLogin = require('../middleware/requireLogin');


router.route('/')
  .get(getAllPortfolioItems)
  .post(requireLogin, createPortfolioItem);
router.route('/:id')
  .get(getPortfolioItem)
  .patch(updatePortfolioItem)
  .delete(deletePortfolioItem);

module.exports = router;