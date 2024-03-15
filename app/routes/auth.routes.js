const { verifySignUp } = require("../../middleware");
const controller = require("../../controllers/auth.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

 

  app.post("/login", controller.signin);

  app.post("/logout", controller.signout);
};