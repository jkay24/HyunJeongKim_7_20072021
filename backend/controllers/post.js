const { Posts } = require("../models");
const { Users } = require("../models");
const fs = require("fs");

exports.createPost = async (req, res) => {
  let image;
  const { body, protocol, file } = req;
  if ((body.content === null || !body.content) && !file) {
    return res.status(400).json({ message: "Aucun contenu à publier." });
  } else {
    if (file) {
      image = `${protocol}://${req.get("host")}/images/${file.filename}`;
    }
    const post = req.body;
    const id = req.user.id;
    post.authorId = id;
    await Users.findByPk(id, {
      attributes: ["firstname"],
    }).then((user) => {
      post.authorFirstname = user.firstname;
      post.image = image;
    });
    await Posts.create(post)
      .then((post) => {
        res
          .status(201)
          .json({ message: "Post created with the ID " + post.id });
      })
      .catch((error) => {
        res.status(400).json({ message: error });
      });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const listOfPosts = await Posts.findAll();
    return res.status(200).json({ listOfPosts: listOfPosts });
  } catch (error) {
    return res.status(400).json({ error: "An error has occurred. " + error });
  }
};

exports.getOnePost = async (req, res) => {
  id = req.params.id;
  await Posts.findOne({ where: { id: id } })
    .then((post) => {
      return res.status(200).json(post);
    })
    .catch((error) => {
      return res.status(400).json({ error: "An error has occurred. " + error });
    });
};

exports.modifyPost = async (req, res) => {
  id = req.params.id;
  const post = req.body;
  let image;
  if (req.file) {
    Posts.findOne({ where: { id: id } });
    image = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
  }
  post.image = image;
  await Posts.findOne({ where: { id: id } })
    .then(() => {
      Posts.update({ ...req.body, image: image }, { where: { id: id } });
      return res
        .status(200)
        .json({ message: "Post ID " + id + " has been updated." });
    })
    .catch((error) => {
      return res.status(400).json({ error: "An error has occurred. " + error });
    });
};

exports.deletePost = (req, res) => {
  id = req.params.id;
  Posts.destroy({ where: { id: id } })
    .then(() => {
      return res
        .status(200)
        .json({ message: "Post ID " + id + " has been deleted." });
    })
    .catch((error) => res.status(500).json({ error }));
};
