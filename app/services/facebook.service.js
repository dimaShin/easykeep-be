let fb = require('fb');

module.exports = class FacebookService {

  getMe(accessToken) {
    fb.setAccessToken(accessToken);

    return new Promise((resolve, reject) => {
      fb.api('me', (payload) => {
        if (!payload || payload.error) {
          reject(payload && payload.error || payload);
          return;
        }
        resolve(payload);
      });
    });
  }

}
