const { Users } = require("../models");
const bcrypt = require("bcrypt");

exports.getOneUser = async (req, res) => {
  try {
    const id = req.params.id;
    await Users.findByPk(id, {
      attributes: ["firstname", "lastname", "email", "profilePic", "admin"],
    }).then((user) => {
      if (!user) {
        res.status(404).json({ error: "User ID " + id + " not found." });
      } else res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

exports.modifyUser = async (req, res) => {
  console.log(req);
  try {
    const id = req.params.id;
    let image;
    if (req.file) {
      image = `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`;
    }
    await Users.update(
      { ...req.body, profilePic: image },
      { where: { id: id } }
    );
    res.status(201).json({ message: "User ID " + id + " updated." });
  } catch (error) {
    res.status(500).send({ error: "An error has occurred" + error });
  }
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  Users.destroy({ where: { id: id } })
    .then(() => res.status(200).json({ message: "User deleted." }))
    .catch((error) => res.status(400).json({ error }));
};
