import e = require("express");
import Model = sequelize.Model;
import sequelize = require("sequelize");
import Instance = sequelize.Instance;

export interface Response extends e.Response {
  end: () => void;
}
