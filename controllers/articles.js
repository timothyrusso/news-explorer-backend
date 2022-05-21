const Article = require("../models/article");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");
const BadRequestError = require("../errors/bad-request-err");
const {
  REQUEST_SUCCEDED,
  RESOURCE_CREATED,
} = require("../utils/constants");

const getUserArticles = (req, res, next) => Article.find({})
  .then((articles) => res.status(REQUEST_SUCCEDED).send(articles))
  .catch(next);

const saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image   } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: req.user._id })
    .then((articles) => res.status(RESOURCE_CREATED).send(articles))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Card.findById(req.params.articleId)
    .orFail(() => new NotFoundError('Article ID not found'))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        next(new ForbiddenError('Yoy cannot delete someone else\'s article')); // cannot delete the article if you are not the owner
      } else {
        Article.deleteOne(article).then(() => res.status(REQUEST_SUCCEDED).send({ data: article }));
      }
    })
    .catch(next);
};

module.exports = {
  getUserArticles,
  saveArticle,
  deleteArticle,
};
