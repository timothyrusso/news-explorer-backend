const router = require('express').Router();
const {
  getUserArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/articles', getUserArticles);

router.post('/articles', saveArticle);

router.delete('/articles/:articleId', deleteArticle);

module.exports = router;
