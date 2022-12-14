const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.id) {
    res.status(400).send({
      message: "id can not be empty!",
    });
    return;
  }

  const product = {
    id: req.body.id,
    stock: req.body.stock,
  };

  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product.",
      });
    });
};

exports.findAll = (req, res) => {
  const id = req.query.id;
  const stock = req.query.stock;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  var condition = stock
    ? stock === "1"
      ? { ...condition, stock: { [Op.gt]: 0 } }
      : { ...condition, stock: { [Op.like]: 0 } }
    : null;

  Product.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving products.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Product.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

exports.incrementStock = (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;
  Product.increment("stock", { by: quantity, where: { id: id } })
    .then((num) => {
      if (num[0][1] == 1) {
        Product.findByPk(id).then((data) => {
          res.send(data);
        });
      } else {
        res.send({
          message: `Cannot increment Product with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

exports.decrementStock = (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;
  // le stock ne doit pas être négatif
  Product.decrement(
    "stock",
    { by: quantity, where: { id: id } },
    { stock: { [Op.gt]: 0 } }
  )
    .then((num) => {
      if (num[0][1] == 1) {
        Product.findByPk(id).then((data) => {
          res.send(data);
        });
      } else {
        res.send({
          message: `Cannot decrement Product with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Products were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all products.",
      });
    });
};
