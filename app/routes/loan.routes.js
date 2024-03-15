const { authJwt } = require("../../middleware");
const controller = require("../../controllers/loans.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });


  app.get('/loans', [authJwt.verifyToken], controller.loans)
  app.get('/loans/:userEmail/get', [authJwt.verifyToken], controller.userLoans)
  app.get('/loans/expired', [authJwt.verifyToken], controller.expiredLoans)
  app.delete('/loan/:loanId/delete', [authJwt.verifyToken], controller.deleteLoans)
};