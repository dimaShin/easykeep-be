import e = require("express");
import {DbClient} from "../db/dbClient";
import {ProductService} from "../services/data/product";
import {AuthService} from "../services/auth";
import TransactionService from "../services/data/transaction";
export interface Application extends e.Application{
  dbClient: DbClient,
  services: {
    data: {
      product: ProductService,
      transaction: TransactionService
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