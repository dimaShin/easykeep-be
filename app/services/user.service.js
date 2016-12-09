let jwt = require('jsonwebtoken');
let jwtSecret = 'jwtsupersecret';


module.exports = class UserService {
  services;

  constructor(services) {
    this.services = services;
  }

  getFacebookAccount(query, defaultData) {
    return this.services.db.models.FacebookAccounts.findOrCreate(
      { where: query,
        defaults: defaultData,
        include: [ this.services.db.models.Users ]
      }).spread(model =>  model)
  }

  getSession(userId) {
    return this.services.db.models.Sessions.findOne({
      where: { UserId: userId }
    }).then(session => {
        return session || this.createSession(userId);
    });
  }

  createSession(userId) {
    return this.services.db.models.Sessions.create({
      UserId: userId,
      token: this.createToken(userId)
    })
  }

  createToken(userId) {
    return jwt.sign({userId: userId}, jwtSecret);
  }
};
