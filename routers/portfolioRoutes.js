const express = require('express');

const router = express.Router();
const {
  getAllPortfolioItems,
  createPortfolioItem,
  getPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
  checkId,
  checkRequiredData,
} = require('../controllers/portfoliosController');


router.param('id', checkId);
router.param('body', checkRequiredData);


router.route('/')
  .get(getAllPortfolioItems)
  .post(checkRequiredData, createPortfolioItem);
router.route('/:id')
  .get(getPortfolioItem)
  .patch(updatePortfolioItem)
  .delete(deletePortfolioItem);

module.exports = router;