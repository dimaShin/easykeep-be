import e = require("express");
import Model = sequelize.Model;
import sequelize = require("sequelize");
import Instance = sequelize.Instance;
import {Application} from "./app";

export interface Request extends e.Request {
  user: any
  app: Application
}