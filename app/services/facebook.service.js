let fb = require('fb');

module.exports = class FacebookService {

  getMe(access_token) {

    return new Promise((resolve, reject) => {
      fb.api('me', { fields: ['email', 'name'], access_token },  (payload) => {
        if (!payload || payload.error) {
          reject(payload && payload.error || payload);
          return;
        }
        resolve(payload);
      });
    });
  }

};
