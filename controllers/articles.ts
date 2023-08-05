import { NextFunction, Response, Request } from 'express';
import Article from '../models/article';
import NotFoundError from '../errors/not-found-err';
import ForbiddenError from '../errors/forbidden-err';
import BadRequestError from '../errors/bad-request-err';
import { REQUEST_SUCCEDED, RESOURCE_CREATED } from '../utils/constants';
import { ValidationError } from './types';

export const getUserArticles = (req: Request, res: Response, next: NextFunction) => {
  const id = req.user._id;
  Article.find({ owner: id })
    .then((articles) => res.status(REQUEST_SUCCEDED).send(articles))
    .catch(next);
};

export const saveArticle = (req: Request, res: Response, next: NextFunction) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((articles) => res.status(RESOURCE_CREATED).send(articles))
    .catch((err: ValidationError) => {
      if (err.name === 'ValidationError') {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(', ')}`,
          ),
        );
      } else {
        next(err);
      }
    });
};

export const deleteArticle = (req: Request, res: Response, next: NextFunction) => {
  Article.findById(req.params.articleId)
    .orFail(() => new NotFoundError('Article ID not found'))
    .then((article) => {
      // @ts-ignore
      if (!article.owner.equals(req.user._id)) {
        next(new ForbiddenError('You cannot delete someone else\'s article')); // cannot delete the article if you are not the owner
      } else {
        Article.deleteOne({ _id: article._id }).then(() => res.status(REQUEST_SUCCEDED).send({ data: article }));
      }
    })
    .catch(next);
};
