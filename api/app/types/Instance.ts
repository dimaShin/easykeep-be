import s = require("sequelize");

export interface Instance extends s.Instance<any> {
  getPublicData: () => any,
  addAccount: (a: Insatance) => any;
}
