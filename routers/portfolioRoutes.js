const express = require('express');

const router = express.Router();
router.param('id', (req, res, next, val) => {
  console.log(`Portfolio Id is ${val}`);
  next();
})
const {
  getAllPortfolioItems,
  createPortfolioItem,
  getPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfoliosController');

router.route('/')
  .get(getAllPortfolioItems)
  .post(createPortfolioItem);
router.route('/:id')
  .get(getPortfolioItem)
  .patch(updatePortfolioItem)
  .delete(deletePortfolioItem);

module.exports = router;