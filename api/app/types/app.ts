import e = require("express");
import {DbClient} from "../db/dbClient";
import {ProductService} from "../services/data/product";
import {AuthService} from "../services/auth";
export interface Application extends e.Application{
  dbClient: DbClient,
  services: {
    data: {
      product: ProductService
    },
    auth: AuthService
  },
  config: {
    db: {
      username: string,
      password: string,
      database: string,
      host: string,
      dialect: string
    },
    env: string
  },
  user: {
    id: string
  }
}
