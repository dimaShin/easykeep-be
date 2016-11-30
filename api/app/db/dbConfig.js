const config = {
  "development": {
    "username": "postgres",
    "password": "123456",
    "database": "postgres",
    "host": "127.0.0.1",
    "dialect": "postgres",
    [Symbol.iterator]: function* () {
      yield config['development'].database;
      yield config['development'].username;
      yield config['development'].password;
      yield config['development'];
    }
  }
};

export default (env) => {
  return config['development']
};

