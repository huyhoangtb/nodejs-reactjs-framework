export const orderActionTypes = {
  SET_ORDER_ON_VIEW: 'SET_ORDER_ON_VIEW',
};

export default {
  setOrderOnView: (currencyCode, order) => ({
    type: orderActionTypes.SET_ORDER_ON_VIEW,
    order,
    currencyCode
  }),
};
