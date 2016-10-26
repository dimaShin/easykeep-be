
module.exports = class UserService {


  constructor(app) {
    this.app = app;
  }

  create(data) {
    let User = this.app.dbClient.db.User;

    return User.create(data)
      .then(user =>  this.assignDefaultAccount(user, data.AccountId, true));
  }

  assignDefaultAccount(user, accountId, asDefault) {
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
      })

  }
};
