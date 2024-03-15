const loans = require("../utils/loans.json");
exports.loans = (req, res) => {
  let loansToSend = loans;
  const status = req.query.status;

  if (req.role === "staff") {
    loansToSend = [];
    loans.forEach((loan) => {
      delete loan.applicant.totalLoan;
      loansToSend.push(loan);
    });
  }

  if (status) {
    loansToSend = loansToSend.filter((loan) => loan.status === status);
  }

  res.status(200).send(loansToSend);
};

exports.userLoans = (req, res) => {
  const email = req.params.userEmail;
  const userLoan = loans.filter((loan) => loan.applicant.email === email);
  res.status(200).send({
    loans: userLoan,
  });
};

exports.expiredLoans = (req, res) => {
  const expiredLoans = loans.filter(
    (loan) => new Date(loan.maturityDate) < new Date()
  );
  res.status(200).send({
    expiredLoans: expiredLoans,
  });
};

exports.deleteLoans = (req, res) => {
  if (req.role !== "superAdmin") {
    return res.status(401).json({
        status: false,
        message: "You are not permitted to perform this action"
    });
  }
  const loanId = req.params.loanId;

  const index = loans.findIndex((loan) => loan.id === loanId);

  if (index !== -1) {
    loans.splice(index, 1);
    return res.status(200).json({
      status: true,
      message: "Loan deleted successfully!",
    });
  }

  res.status(400).json({
    status: false,
    message: "No loan found with the provided ID",
  });
};
