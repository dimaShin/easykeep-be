import s = require("sequelize");

export interface Instance extends s.Instance<any> {
  getPublicData: () => any,
  addAccount: (a: s.Instance<any>) => any;
}
