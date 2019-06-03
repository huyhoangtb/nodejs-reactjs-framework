'use strict';


class Error {
  errorCodes = {
    VALIDATE_ERR: 1001
  };

  error = false;
  errMessage = undefined;
  errorCode = undefined;

  setError = (err) => {
    this.error = err;
  }

}

module.exports = Error;
