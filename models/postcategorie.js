module.exports = (sequelize, DataTypes) => {
  const PostCategorie = sequelize.define('PostCategorie', {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, foreignKey: true },
  },
  {
    timestamps: false,
    tableName: 'PostsCategories',
  });

  return PostCategorie;
};