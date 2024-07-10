"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {}
  }
  Author.init(
    {
      name: DataTypes.STRING,
      avatar_url: DataTypes.STRING,
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Author",
    }
  );
  return Author;
};
