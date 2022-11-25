const authJwt = require("../middleware/authJwt.js");

module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Créer un nouveau produit
  router.post(
    "/",
    // [authJwt.verifyToken],
    products.create
  );

  // Récupérer tous les produits
  router.get("/", products.findAll);

  // Récupérer un produit avec son id
  router.get("/:id", products.findOne);

  // Mettre à jour un produit avec son id
  router.put(
    "/:id",
    // [authJwt.verifyToken],
    products.update
  );

  // Supprimer un produit avec son id
  router.delete(
    "/:id",
    // [authJwt.verifyToken],
    products.delete
  );

  // Supprimer tous les produits
  router.delete(
    "/",
    // [authJwt.verifyToken],
    products.deleteAll
  );

  app.use("/api/products", router);
};
