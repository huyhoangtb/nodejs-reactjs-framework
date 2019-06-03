export const tradeActionTypes = {
  SET_EXCHANGE_RATE: 'SET_EXCHANGE_RATE',
  SET_USER_WALLETS: 'SET_USER_WALLETS',
  GET_EXCHANGE_RATE: 'GET_EXCHANGE_RATE',
};

export default {
  setExchangeRage: (payload) => ({
    type: tradeActionTypes.SET_EXCHANGE_RATE,
    payload,
  }),
  setUserWallets: (payload) => ({
    type: tradeActionTypes.SET_USER_WALLETS,
    payload,
  }),
  getExchangeRate: (url) => ({ // saga
    type: tradeActionTypes.GET_EXCHANGE_RATE,
    url,
  }),
};
