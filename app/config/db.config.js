module.exports = {
    HOST: "localhost",
    USER: "adewumi",
    PASSWORD: "password",
    DB: "buy_simply",
    PORT: "3506",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };