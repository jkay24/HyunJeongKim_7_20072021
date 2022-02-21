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
    authorFirstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Posts;
};
