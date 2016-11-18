
import {Application} from "../../types/app";
import {Instance} from "../../types/Instance";
export default class UserService {

  app: Application;

  constructor(app) {
    this.app = app;
  }

  create(data): Promise<Instance> {
    let User = this.app.dbClient.db.User;

    return User.create(data)
      .then(user =>  this.assignDefaultAccount(user, data.AccountId, true));
  }

  assignDefaultAccount(user: Instance, accountId: string, asDefault: boolean): Promise<Instance> {
    let Account = this.app.dbClient.db.Account;
    let userName = user.get('name');

    return Account.findOrCreate({ where: {id: accountId}, defaults: {name: `${userName} - default account`} })
      .then(payload => {
        let [ account ] = payload;

        user.addAccount(account);
        if (asDefault) {
          user.set('defaultAccount', account.get('id'));
          return user.save();
        }

        return user;
      });

  }
};
