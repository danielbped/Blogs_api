module.exports = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  PostCategorie.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categories',
      through: PostCategorie,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategorie;
};