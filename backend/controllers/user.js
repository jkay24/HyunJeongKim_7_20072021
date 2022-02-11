const dbc = require("../config/db");
const db = dbc.getDB();

exports.getOneUser = (req, res, next) => {
  const { id: id } = req.params;
  db.query(`SELECT * FROM users WHERE id = ${id};`, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    delete result[0].pw;
    res.status(200).json(result);
  });
};

exports.modifyUser = (req, res, next) => {
  if (req.file) {
    const { id: id } = req.params;
    let { destination, filename } = req.file;
    destination = destination + filename;

    const sqlInsertImage = `INSERT INTO images (post_id, user_id, image_url) VALUES (NULL, ${user_id}, "${destination}");`;
    db.query(sqlInsertImage, (err, result) => {
      if (err) {
        res.status(404).json({ err });
        throw err;
      }
    });
  }
  const { user_firstname, user_lastname } = req.body;
  const { id: userId } = req.params;
  const sqlUpdateUser = `UPDATE users SET user_firstname = "${user_firstname}", user_lastname = "${user_lastname}" WHERE users.user_id = ${userId};`;
  db.query(sqlUpdateUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    if (result) {
      res.status(200).json(result);
    }
  });
};
exports.getProfilePic = (req, res, next) => {
  const { id: user_id } = req.params;
  const sqlGetUser = `SELECT image_url FROM images WHERE images.user_id = ${user_id} ORDER BY images.image_id desc;`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};
