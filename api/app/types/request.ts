import e = require("express");
import Model = sequelize.Model;
import sequelize = require("sequelize");
import Instance = sequelize.Instance;

export interface Request extends e.Request {
  user: Instance | { id: string }
}