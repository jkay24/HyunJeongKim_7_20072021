module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};
