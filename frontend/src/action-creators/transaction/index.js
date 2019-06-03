export const transactionActionTypes = {
  SET_TRANSACTION_ON_VIEW: 'SET_TRANSACTION_ON_VIEW',
};

export default {
  setTransactionOnView: (currencyCode, transaction) => ({
    type: transactionActionTypes.SET_TRANSACTION_ON_VIEW,
    transaction,
    currencyCode
  }),
};
