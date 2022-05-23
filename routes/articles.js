const router = require("express").Router();
const {
  getUserArticles,
  saveArticle,
  deleteArticle,
} = require("../controllers/articles");
const {
  saveArticleValidation,
  validateArticleId,
} = require("../middlewares/validations");

router.get("/articles", getUserArticles);

router.post("/articles", saveArticleValidation, saveArticle);

router.delete("/articles/:articleId", validateArticleId, deleteArticle);

module.exports = router;
