const { Op } = require('sequelize');

const { BlogPost } = require('../../models');
const { User } = require('../../models');
const { Categorie } = require('../../models');

const findPostByText = async (req, res, next) => {
  try {
    const { q: query } = req.query;

    const posts = query ? await BlogPost.findAll({
      where: { [Op.or]: [{ title: query }, { content: query }] },
      include: [{ model: User, as: 'user' }, { model: Categorie, as: 'categories' }],
    }) : await BlogPost.findAll({
      include: [{ model: User, as: 'user' }, { model: Categorie, as: 'categories' }],
    });

    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};

module.exports = (router) => {
  router.get('/search', findPostByText);
};