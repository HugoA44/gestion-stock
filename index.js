const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./models");
const Product = db.products;

// db.sequelize
//   .sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial();
});

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur stockstock.com" });
});

require("./routes/product.routes.js")(app);
require("./routes/stock.routes.js")(app);
require("./routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on port 8080");
});

function initial() {
  Product.create({
    id: 1,
    title: "T-shirt",
    stock: 120,
  });
  Product.create({
    id: 2,
    title: "Pantalon",
    stock: 80,
  });
  Product.create({
    id: 3,
    title: "Chaussures",
    stock: 60,
  });
  Product.create({
    id: 4,
    title: "Pull",
    stock: 100,
  });
  Product.create({
    id: 5,
    title: "Veste",
    stock: 0,
  });
  Product.create({
    id: 6,
    title: "Chapeau",
    stock: 30,
  });
  Product.create({
    id: 7,
    title: "Ceinture",
    stock: 20,
  });
  Product.create({
    id: 8,
    title: "Chaussettes",
    stock: 0,
  });
  Product.create({
    id: 9,
    title: "Gants",
    stock: 5,
  });
  Product.create({
    id: 10,
    title: "Bonnet",
    stock: 3,
  });
}
