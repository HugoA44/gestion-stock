module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("product", {
    id: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: false,
      unique: true,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
    },
  });

  return Product;
};
