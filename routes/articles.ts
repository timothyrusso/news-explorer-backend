import { Router } from 'express';
import {
  getUserArticles,
  saveArticle,
  deleteArticle,
} from '../controllers/articles';
import {
  saveArticleValidation,
  validateArticleId,
} from '../middlewares/validations';

const router = Router();

router.get('/articles', getUserArticles);

router.post('/articles', saveArticleValidation, saveArticle);

router.delete('/articles/:articleId', validateArticleId, deleteArticle);

export default router;
