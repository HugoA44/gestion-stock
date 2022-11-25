module.exports = (app) => {
  const products = require("../controllers/product.controller.js");

  var router = require("express").Router();

  // Incrémenter le stock d'un produit
  router.put(
    "/inc/:id",
    // [authJwt.verifyToken],
    products.incrementStock
  );

  // Décrémenter le products d'un produit
  router.put(
    "/dec/:id",
    // [authJwt.verifyToken],
    products.decrementStock
  );

  app.use("/api/stock", router);
};
