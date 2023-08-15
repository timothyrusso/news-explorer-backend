import { Router } from 'express';
import {
  getUserArticles,
  saveArticle,
  deleteArticle,
} from '../controllers/articles.js';
import {
  saveArticleValidation,
  validateArticleId,
} from '../middlewares/validations.js';

const router = Router();

router.get('/articles', getUserArticles);

router.post('/articles', saveArticleValidation, saveArticle);

router.delete('/articles/:articleId', validateArticleId, deleteArticle);

export default router;
